import { dirname, relative, resolve } from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import simpleGit from 'simple-git';

import type { CreateNodeArgs, GatsbyNode } from 'gatsby';

interface MarkdownRemark {
  readonly fileAbsolutePath: string;
  readonly fields?: {
    readonly sourceFileType?: 'posts' | 'steam' | 'zenn';
  };
  readonly frontmatter: {
    readonly createat?: string;
    readonly steam?: string;
    readonly tags?: readonly string[];
    readonly topics?: readonly string[];
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

  const path = (getNode(node.parent).relativePath as string).replace('.md', '');
  const zennUrl = `https://zenn.dev/proudust/${path}`;
  actions.createNodeField({ name: 'externalUrl', node, value: zennUrl });
}

function appendSteamUrl(args: CreateNodeArgs): void {
  if (!isMarkdownRemarkNode(args)) return;

  const { node, actions } = args;
  if (node.fields?.sourceFileType !== 'steam') return;

  const externalUrl = node.frontmatter?.steam;
  actions.createNodeField({ name: 'externalUrl', node, value: externalUrl });
}

function appendTags(args: CreateNodeArgs): void {
  if (!isMarkdownRemarkNode(args)) return;

  const { node, actions } = args;
  const tags =
    node.fields?.sourceFileType === 'zenn' ? node.frontmatter.topics : node.frontmatter.tags;
  actions.createNodeField({ name: 'tags', node, value: tags });
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
    const createAt = node.frontmatter.createat ?? commits.all[commits.total - 1]?.date;
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
    appendTags(args),
    appendSlug(args),
    appendSteamUrl(args),
    appendZennUrl(args),
  ]);
