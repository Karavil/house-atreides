export const absurd = <T>(v: never): T => {
  throw new Error(`Unexpected value received: ${v}, type: ${typeof v}`);
};
