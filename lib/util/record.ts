export const getRecordPairs = <K extends string, V>(
  record: Record<K, V[]>
): [K, V][] => {
  const pairs: [K, V][] = [];

  Object.keys(record).forEach((key) => {
    const values = record[key as K];

    values.forEach((value) => {
      pairs.push([key as K, value]);
    });
  });

  return pairs;
};
