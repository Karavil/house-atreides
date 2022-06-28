import { getDateForNYC, snapToSunday } from "./calendar";

export const randomWithSeed = (seed: number) => {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Generate weekly seed (resets every Monday at 12AM). Use the NYC timezone
// to ensure that the seed is consistent across the server and clients in other
// timezones.
export const generateWeeklySeed = () => snapToSunday(getDateForNYC()).getTime();
