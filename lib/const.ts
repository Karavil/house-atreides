import { DeterministicScheduleGenerator } from "./generator/deterministic-schedule-generator";
import { getRecordPairs } from "./util/record";
import { toMs } from "./util/time";

export const USERS = ["Alp", "Erik", "Adam", "Grace", "Shelby"] as const;
export type User = typeof USERS[number];

export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type Day = typeof DAYS[number];

const WEEKEND_DAYS: Set<Day> = new Set(["Saturday", "Sunday"] as const);
const WEEK_DAYS = new Set(DAYS.filter((day) => !WEEKEND_DAYS.has(day)));

export const CHORES = [
  "Clean floors",
  "Take out trash",
  "Wash dishes",
  "Clean kitchen",
  "Clean living room",
];

export const WEEKS_SINCE_EPOCH = Math.floor(
  (Date.now() - new Date(0).getTime()) / toMs(1, "week")
);

const [
  LAUNDRY_PRIORITY_SCHEDULE_THIS_WEEK,
  LAUNDRY_PRIORITY_SCHEDULE_NEXT_WEEK,
] = [0, 1].map((weekOffset) => {
  const generator = new DeterministicScheduleGenerator({
    scheduleFor: USERS,
    activities: [...WEEK_DAYS],
    seedKey: `laundry-week-${weekOffset}`,
  });

  const schedule = generator.generateRandomSchedule();

  return getRecordPairs(schedule).reduce((acc, [user, day]) => {
    if (acc[day]) {
      throw new Error(
        "Multiple users assigned to the same day… are there more users than days?"
      );
    }

    acc[day] = user;
    return acc;
  }, {} as Partial<Record<Day, User>>);
});

export const SCHEDULE = {
  laundryPriority: {
    thisWeek: LAUNDRY_PRIORITY_SCHEDULE_THIS_WEEK,
    nextWeek: LAUNDRY_PRIORITY_SCHEDULE_NEXT_WEEK,
  },
  chores: {},
} as const;
