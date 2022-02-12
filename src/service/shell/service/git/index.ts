import { exec } from "../../service/process";

export const init = async () => {
  await exec("git init");

  await exec("git branch -M main");
};

export const status = async () => {
  return await exec("git status");
};

export const addAll = async () => {
  await exec("git add .");
};

export const commit = async (commitText: string) => {
  const text = commitText
    ? commitText
    : `Auto commit | ${new Date().toLocaleString()}`;

  await exec(`git commit -m "${text}"`);
};

export const push = async (branchName = "main") => {
  await exec(`git push -u origin ${branchName}`);
};

export const cleanAddedFiles = async () => {
  await exec("git rm -r --cached .");
};

export const createBranch = async (branchName: string) => {
  await exec(`git checkout -b ${branchName}`);
};

// from git and github
export const resetPrevCommit = async (branchName: string = "main") => {
  await exec("git reset --soft HEAD^");

  await exec(`git push origin +${branchName}`);
};

export const amend = async (commitText: string) => {
  const text = commitText
    ? commitText
    : `Auto commit | ${new Date().toLocaleString()}`;

  await exec(`git --amend commit -m "${text}"`);
};

export const setRemote = async (url: string) => {
  await exec(`git remote set-url origin  ${url}`);
};

export const showRemote = async () => {
  await exec("git remote -v");
};
