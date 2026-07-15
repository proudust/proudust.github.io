import { existsSync } from 'fs';
import { readdir } from 'fs/promises';
import { sep } from 'path';
import { fileURLToPath } from 'url';

import type { Loader, LoaderContext } from 'astro/loaders';

import { getGitInfo } from './git-info';
import { normalizeDate, syncMarkdownEntries } from './markdown';
import type { MarkdownFile } from './markdown';

/**
 * Loads local articles under packages/posts.
 * Articles with steam in their frontmatter will have sourceFileType: 'steam',
 * and they do not have a slug, only an external URL
 * (no internal page is generated).
 */
export function postsLoader(): Loader {
  return {
    name: 'posts-loader',
    load: async context => {
      const baseDir = new URL('../posts/', context.config.root);

      const sync = async (): Promise<void> => {
        const files = await listPostFiles(baseDir);
        await syncMarkdownEntries(context, files, async ({ id, data, absolutePath }) => {
          const sourceFileType = data.steam ? 'steam' : 'posts';
          const git = await getGitInfo(absolutePath);
          return {
            sourceFileType,
            slug: sourceFileType === 'posts' ? `/${id}/` : undefined,
            externalUrl: sourceFileType === 'steam' ? data.steam : undefined,
            createat: normalizeDate(data.createat) ?? git.createat,
            updateat: git.updateat,
          };
        });
      };

      await sync();
      watchPostFiles(context, baseDir, sync);
    },
  };
}

async function listPostFiles(baseDir: URL): Promise<MarkdownFile[]> {
  const entries = await readdir(baseDir, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => ({ id: entry.name, fileUrl: new URL(`${entry.name}/index.md`, baseDir) }))
    .filter(file => existsSync(file.fileUrl));
}

function watchPostFiles(context: LoaderContext, baseDir: URL, sync: () => Promise<void>): void {
  const { watcher, logger } = context;
  if (!watcher) return;

  const basePath = fileURLToPath(baseDir);
  watcher.add(basePath);
  const onChange = (changedPath: string): void => {
    if (!changedPath.startsWith(basePath) || !changedPath.endsWith(`${sep}index.md`)) return;
    sync().catch(error => logger.error(`Failed to reload posts: ${error.message}`));
  };
  watcher.on('add', onChange);
  watcher.on('change', onChange);
  watcher.on('unlink', onChange);
}
