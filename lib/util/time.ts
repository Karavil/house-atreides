import { absurd } from "./types";

type TimeUnit =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year";

export const toMs = (
  count: number,
  unit: TimeUnit | `${TimeUnit}s`
): number => {
  switch (unit) {
    case "second":
    case "seconds":
      return count * 1000;
    case "minute":
    case "minutes":
      return toMs(count, "second") * 60;
    case "hour":
    case "hours":
      return toMs(count, "minute") * 60;
    case "day":
    case "days":
      return toMs(count, "hour") * 24;
    case "week":
    case "weeks":
      return toMs(count, "day") * 7;
    case "month":
    case "months":
      return toMs(count, "day") * 30;
    case "year":
    case "years":
      return toMs(count, "day") * 365;
    default:
      return absurd(unit);
  }
};
