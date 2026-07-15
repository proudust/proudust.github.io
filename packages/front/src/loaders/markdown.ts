import { promises as fs } from 'fs';
import { relative, sep } from 'path';
import { fileURLToPath } from 'url';

import type { LoaderContext } from 'astro/loaders';

export interface MarkdownFile {
  readonly id: string;
  readonly fileUrl: URL;
}

export type AugmentFn = (params: {
  readonly id: string;
  readonly data: Record<string, unknown>;
  readonly absolutePath: string;
}) => Promise<Record<string, unknown>>;

interface ContentEntryType {
  getEntryInfo(params: {
    contents: string;
    fileUrl: URL;
  }): Promise<{ data: Record<string, unknown>; body: string }>;
}

// entryTypes and store.addAssetImports are runtime-provided APIs that are also
// used by the glob loader, but they are not included in the public types.
type LoaderContextWithEntryTypes = LoaderContext & {
  entryTypes?: Map<string, ContentEntryType>;
};

type StoreWithAssetImports = LoaderContext['store'] & {
  addAssetImports?: (assets: string[], filePath?: string) => void;
};

function posixRelative(from: string, to: string): string {
  return relative(from, to).split(sep).join('/');
}

/** YAML パーサー次第で Date になる日時フィールドを ISO 文字列に揃える。 */
export function normalizeDate(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'string') return value;
  return undefined;
}

/**
 * Markdown ファイル群を Content Layer のストアへ同期する。
 * astro/loaders の glob() と同じエントリ形状で保存しつつ、
 * augment で gatsby-node.ts の onCreateNode 相当の派生フィールドを合成する。
 */
export async function syncMarkdownEntries(
  context: LoaderContext,
  files: readonly MarkdownFile[],
  augment: AugmentFn,
): Promise<void> {
  const { config, store, parseData, renderMarkdown, generateDigest } = context;
  const entryType = (context as LoaderContextWithEntryTypes).entryTypes?.get('.md');
  if (!entryType) throw new Error('Markdown entry type is not available.');

  const root = fileURLToPath(config.root);
  const untouched = new Set(store.keys());

  await Promise.all(
    files.map(async ({ id, fileUrl }) => {
      untouched.delete(id);

      const contents = await fs.readFile(fileUrl, 'utf-8');
      const { body, data } = await entryType.getEntryInfo({ contents, fileUrl });
      const absolutePath = fileURLToPath(fileUrl);
      const extra = await augment({ id, data, absolutePath });

      const digest = generateDigest(contents + JSON.stringify(extra));
      const existing = store.get(id);
      if (existing && existing.digest === digest && existing.filePath) {
        if (existing.assetImports?.length) {
          (store as StoreWithAssetImports).addAssetImports?.(
            existing.assetImports,
            existing.filePath,
          );
        }
        return;
      }

      const parsedData = await parseData({
        id,
        data: { ...data, ...extra },
        filePath: absolutePath,
      });
      const rendered = await renderMarkdown(contents, { fileURL: fileUrl });
      store.set({
        id,
        data: parsedData,
        body,
        filePath: posixRelative(root, absolutePath),
        digest,
        rendered,
        assetImports: (rendered.metadata as { imagePaths?: string[] } | undefined)?.imagePaths,
      });
    }),
  );

  untouched.forEach(id => store.delete(id));
}
