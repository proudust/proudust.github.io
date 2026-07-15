import { existsSync } from 'fs';
import { mkdir, readdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import type { AstroIntegrationLogger } from 'astro';
import type { Loader } from 'astro/loaders';
import simpleGit from 'simple-git';

import { getGitInfo } from './git-info';
import { normalizeDate, syncMarkdownEntries } from './markdown';

const REMOTE = 'https://github.com/proudust/zenn-contents.git';
const BRANCH = 'master';

/**
 * Loads articles from the external repository zenn-contents.
 * Clones the repository into node_modules/.cache/zenn-contents and imports
 * articles/*.md.
 */
export function zennLoader(): Loader {
  return {
    name: 'zenn-loader',
    load: async context => {
      const cloneDir = new URL('node_modules/.cache/zenn-contents/', context.config.root);
      await ensureClone(cloneDir, context.logger);

      const articlesDir = new URL('articles/', cloneDir);
      const names = await readdir(articlesDir);
      const files = names
        .filter(name => name.endsWith('.md'))
        .map(name => ({
          id: `articles/${name.replace('.md', '')}`,
          fileUrl: new URL(name, articlesDir),
        }));

      await syncMarkdownEntries(context, files, async ({ id, data, absolutePath }) => {
        const git = await getGitInfo(absolutePath);
        return {
          sourceFileType: 'zenn',
          externalUrl: `https://zenn.dev/proudust/${id}`,
          createat: normalizeDate(data.createat) ?? git.createat,
          updateat: git.updateat,
        };
      });
    },
  };
}

async function ensureClone(cloneDir: URL, logger: AstroIntegrationLogger): Promise<void> {
  const dirPath = fileURLToPath(cloneDir);
  if (existsSync(join(dirPath, '.git'))) {
    try {
      const git = simpleGit(dirPath);
      await git.fetch('origin', BRANCH);
      await git.reset(['--hard', `origin/${BRANCH}`]);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      logger.warn(`Failed to update zenn-contents, using the existing clone: ${message}`);
    }
  } else {
    await mkdir(dirname(dirPath), { recursive: true });
    await simpleGit().clone(REMOTE, dirPath, ['--branch', BRANCH]);
  }
}
