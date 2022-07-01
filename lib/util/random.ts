import { createNewYorkDate, snapToSunday } from "./calendar";
import randomseed from "random-seed";

export const randomWithSeed = (...seed: (string | number)[]) => {
  const rng = randomseed.create(seed.join("-"));
  return rng.random();
};

// Generate weekly seed (resets every Monday at 12AM). Use the NYC timezone
// to ensure that the seed is consistent across the server and clients in other
// timezones.
export const generateWeeklySeed = (weekOffset: number = 0) => {
  const date = createNewYorkDate();
  date.setDate(date.getDate() + weekOffset * 7);

  return snapToSunday(date).getTime();
};
