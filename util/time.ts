import { absurd } from "./type";

type TimeUnit = "day" | "hour" | "minute" | "second";

export const toMs = (
  count: number,
  unit: TimeUnit | `${TimeUnit}s`
): number => {
  switch (unit) {
    case "day":
    case "days":
      return 24 * toMs(count, "hour");
    case "hour":
    case "hours":
      return 60 * toMs(count, "minutes");
    case "minute":
    case "minutes":
      return 60 * toMs(count, "seconds");
    case "second":
    case "seconds":
      return count * 1000;
    default:
      return absurd<number>(unit);
  }
};
