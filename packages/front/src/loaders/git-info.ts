import { access } from 'fs/promises';
import { dirname, join, relative, resolve } from 'path';

import simpleGit from 'simple-git';
import type { SimpleGit } from 'simple-git';

export interface GitInfo {
  readonly createat?: string;
  readonly updateat?: string;
}

const repos = new Map<string, Promise<SimpleGit>>();

async function findRepoRoot(fromDir: string): Promise<string> {
  let dirPath = fromDir;
  while (await access(join(dirPath, '.git')).catch(() => true)) {
    const parent = resolve(dirPath, '..');
    if (parent === dirPath) throw new Error(`.git not found above ${fromDir}`);
    dirPath = parent;
  }
  return dirPath;
}

function openRepo(repoRoot: string): Promise<SimpleGit> {
  const cached = repos.get(repoRoot);
  if (cached) return cached;
  const opening = (async () => {
    const git = simpleGit(repoRoot);
    // unshallow if needs
    if ((await git.revparse(['--is-shallow-repository'])) === 'true') {
      await git.fetch(['--unshallow']).catch(() => undefined);
    }
    return git;
  })();
  repos.set(repoRoot, opening);
  return opening;
}

export async function getGitInfo(absolutePath: string): Promise<GitInfo> {
  const repoRoot = await findRepoRoot(dirname(absolutePath));
  const git = await openRepo(repoRoot);
  const relativePath = relative(repoRoot, absolutePath);
  const commits = await git.log({ file: relativePath }).catch(() => undefined);

  return { createat: commits?.latest?.date, updateat: commits?.latest?.date };
}
