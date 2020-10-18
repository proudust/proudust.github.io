import { basename, dirname, posix, relative, resolve } from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import simpleGit from 'simple-git';

import type { CreateNodeArgs, GatsbyNode } from 'gatsby';

interface MarkdownRemark {
  readonly fileAbsolutePath: string;
  readonly fields?: {
    readonly sourceFileType?: 'posts' | 'zenn';
  };
  readonly frontmatter: {
    readonly steam?: string;
  };
}

function isMarkdownRemarkNode(x: CreateNodeArgs): x is CreateNodeArgs<MarkdownRemark> {
  return x.node.internal.type === 'MarkdownRemark';
}

function appendSourceFileType(args: CreateNodeArgs): void {
  if (!isMarkdownRemarkNode(args)) return;

  const { node, actions, getNode } = args;
  if (node.fields?.sourceFileType) return;

  const sourceFileType = node.frontmatter.steam ? 'steam' : getNode(node.parent).sourceInstanceName;
  actions.createNodeField({ name: 'sourceFileType', node, value: sourceFileType });
}

function appendSlug(args: CreateNodeArgs): void {
  if (!isMarkdownRemarkNode(args)) return;

  const { node, actions } = args;
  if (node.fields?.sourceFileType !== 'posts') return;
  const slug = createFilePath(args);
  actions.createNodeField({ name: 'slug', node, value: slug });
}

function appendZennUrl(args: CreateNodeArgs): void {
  if (!isMarkdownRemarkNode(args)) return;

  const { node, actions, getNode } = args;
  if (node.fields?.sourceFileType !== 'zenn') return;

  const { relativePath } = getNode(node.parent);
  const zennUrl = `https://zenn.dev/proudust/${relativePath}`;
  actions.createNodeField({ name: 'zenn', node, value: zennUrl });
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
    const createAt = commits.all[commits.total - 1]?.date;
    const updateAt = commits.latest?.date;
    actions.createNodeField({ name: `createat`, node, value: createAt });
    actions.createNodeField({ name: `updateat`, node, value: updateAt });
    break;
  }
}

export const onCreateNode: GatsbyNode['onCreateNode'] = async args =>
  Promise.all([
    appendSourceFileType(args),
    appendGitInfo(args),
    appendSlug(args),
    appendZennUrl(args),
  ]);
