import { createContext, useContext } from "react";
import { SCHEDULE } from "../const";

export type Schedule = typeof SCHEDULE;

export const ScheduleContext = createContext<Schedule | null>(null);

export const useScheduleContext = () => {
  const schedule = useContext(ScheduleContext);

  if (schedule === null) {
    throw new Error(`Not wrapped in ${ScheduleContext.displayName}`);
  }

  return schedule;
};
