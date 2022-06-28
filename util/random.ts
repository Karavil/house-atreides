import { getDateForNYC, snapToSunday } from "./calendar";

export const randomWithSeed = (seed: number) => {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Generate weekly seed (resets every Monday as the snap
export const generateWeeklySeed = () => snapToSunday(getDateForNYC()).getTime();
