// Used for exhaustive type checking with runtime errors
// in case a value is provided.
export const absurd = <T>(v: never): T => {
  throw new Error(`unexpected value: ${v}, ${typeof v}`);
};
