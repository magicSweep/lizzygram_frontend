import { exec as exec__ } from "child_process";
import { promisify } from "util";

export const exec_ = promisify(exec__);

export const exec = async (command: string) => {
  const { stdout, stderr } = await exec_(command);

  if (stderr) throw new Error(stderr);

  console.log("stdout", stdout);
};

export const execStdout = async (command: string) => {
  const { stdout, stderr } = await exec_(command);

  if (stderr) throw new Error(stderr);

  console.log("stdout", stdout);

  return stdout;
};
