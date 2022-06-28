// Takes in any
export const cN = (...args: unknown[]): string => {
  return args.filter((arg) => typeof arg === "string").join(" ");
};
