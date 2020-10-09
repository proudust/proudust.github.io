import { basename, dirname, posix, relative, resolve, sep } from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import simpleGit from 'simple-git';

import type { GatsbyNode } from 'gatsby';

function getSlug(path: string): string {
  const fileName = basename(path);
  return posix.join('/', fileName.substr(0, fileName.length - 3), '/');
}

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const absolutePath = node.fileAbsolutePath as string;
    const slug = absolutePath.endsWith('index.md')
      ? createFilePath({ node, getNode })
      : getSlug(absolutePath);
    createNodeField({ name: `slug`, node, value: slug });

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
