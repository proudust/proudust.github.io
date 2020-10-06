import { dirname, relative, resolve } from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import simpleGit from 'simple-git';

import type { GatsbyNode } from 'gatsby';

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });
    createNodeField({ name: `slug`, node, value: slug });

    const absolutePath = node.fileAbsolutePath as string;
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
