export const duplicateItems = <TItem, TDuplicate extends number>(
  items: TItem[],
  timesToDuplicate: number
): TItem[] => {
  if (timesToDuplicate < 0) {
    throw new Error(`timesToDuplicate must be >= 0`);
  }

  return items.flatMap((item) => {
    return Array.from({ length: timesToDuplicate }, () => item);
  });
};
