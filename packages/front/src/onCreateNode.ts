import { basename, dirname, posix, relative, resolve, sep } from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import simpleGit from 'simple-git';

import type { GatsbyNode } from 'gatsby';

function getSlug(path: string): string {
  const fileName = basename(path);
  const slug = fileName
    .substring(0, fileName.length - 3)
    .replace(/^(\d{4})-(\d{2})-(\d{2})-/, '$1$2$3-');
  return posix.join('/', slug, '/');
}

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const absolutePath = node.fileAbsolutePath as string;
    const isInside = absolutePath.endsWith('index.md');
    const slug = isInside ? createFilePath({ node, getNode }) : getSlug(absolutePath);
    createNodeField({ name: `slug`, node, value: slug });

    const source = isInside ? 'inside' : 'zenn';
    createNodeField({ name: `source`, node, value: source });

    let dirPath = dirname(absolutePath);
    while (true) {
      const git = simpleGit(dirPath);
      const relativePath = relative(dirPath, absolutePath);
      const commits = await git.log({ file: relativePath }).catch(() => undefined);
      if (!commits) {
        dirPath = resolve(dirPath, '..');
        continue;
      }
      const createAt = commits.all[commits.total - 1].date;
      const updateAt = commits.latest.date;
      createNodeField({ name: `createat`, node, value: createAt });
      createNodeField({ name: `updateat`, node, value: updateAt });
      break;
    }
  }
};
