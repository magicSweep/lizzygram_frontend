export const stackDepth = (msg: string = "Stack size") => {
  console.log(`${msg} | ${new Error().stack.split("\n").length}`);
};

const stackSize = () => {
  new Error().stack.split("\n").splice(2);
};
