import { getDateForNYC, snapToSunday } from "./calendar";

export const randomWithSeed = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Generate weekly seed (resets every Monday at 12AM). Use the NYC timezone
// to ensure that the seed is consistent across the server and clients in other
// timezones.
export const generateWeeklySeed = (weekOffset: number = 0) => {
  const date = getDateForNYC();
  date.setDate(date.getDate() + weekOffset * 7);

  return snapToSunday(date).getTime();
};
