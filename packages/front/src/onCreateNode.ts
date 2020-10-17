import { basename, dirname, posix, relative, resolve } from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import simpleGit from 'simple-git';

import type { CreateNodeArgs, GatsbyNode } from 'gatsby';

interface MarkdownRemark {
  readonly fileAbsolutePath: string;
}

function isMarkdownRemarkNode(x: CreateNodeArgs): x is CreateNodeArgs<MarkdownRemark> {
  return x.node.internal.type === 'MarkdownRemark';
}

function appendSlug(args: CreateNodeArgs): void {
  if (!isMarkdownRemarkNode(args)) return;

  const { node, actions } = args;
  const absolutePath = node.fileAbsolutePath;
  if (!absolutePath) return;
  const isInside = absolutePath.endsWith('index.md');
  const slug = isInside ? createFilePath(args) : getSlugFromZennArticles(absolutePath);
  actions.createNodeField({ name: 'slug', node, value: slug });

  const source = isInside ? 'inside' : 'zenn';
  actions.createNodeField({ name: 'source', node, value: source });
}

function getSlugFromZennArticles(path: string): string {
  const fileName = basename(path);
  const slug = fileName
    .substring(0, fileName.length - 3)
    .replace(/^(\d{4})-(\d{2})-(\d{2})-/, '$1$2$3-');
  return posix.join('/', slug, '/');
}

async function appendGitInfo(args: CreateNodeArgs): Promise<void> {
  if (!isMarkdownRemarkNode(args)) return;

  const { node, actions } = args;
  const absolutePath = node.fileAbsolutePath;
  if (!absolutePath) return;
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
    actions.createNodeField({ name: `createat`, node, value: createAt });
    actions.createNodeField({ name: `updateat`, node, value: updateAt });
    break;
  }
}

export const onCreateNode: GatsbyNode['onCreateNode'] = async args => {
  const promises: Promise<void>[] = [];
  promises.push(appendGitInfo(args));
  appendSlug(args);
  return Promise.all(promises);
};
