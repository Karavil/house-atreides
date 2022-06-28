import type { NextPage } from 'next'
import { generateWeeklySeed, randomWithSeed } from "../util/random";

const USERS = ["Alp", "Erik", "Adam", "Grace", "Shelby"];

type User = typeof USERS[number];

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

type Day = typeof DAYS[number];

const WEEKLY_SHUFFLED_DAYS = [...DAYS]
  .map((day, i) => ({
    day,
    sortOrder: randomWithSeed(generateWeeklySeed() * i),
  }))
  .sort((a, b) => a.sortOrder - b.sortOrder)
  .map(({ day }) => day);

// Only assign the first n shuffled days (we'll assign the rest as first come, first serve)
const WEEKLY_SHUFFLED_DAYS_TO_ASSIGN = WEEKLY_SHUFFLED_DAYS.slice(
  0,
  USERS.length
);

const DAY_TO_USER_MAP = WEEKLY_SHUFFLED_DAYS_TO_ASSIGN.reduce(
  (acc, day, index) => {
    acc[day] = USERS[index];
    return acc;
  },
  {} as Partial<Record<Day, User>>
);

const Home: NextPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <div className="w-min divide-y">
        {DAYS.map((day) => (
          <div
            className="flex flex-row justify-between gap-12 py-2 px-2"
            key={day}
          >
            <h1>{day}</h1>
            <span className="whitespace-nowrap">
              {DAY_TO_USER_MAP[day] ?? (
                <i className="text-gray-500">First come, first serve</i>
              )}
            </span>
          </div>
        ))}
      </div>
      <p className="text-gray-200 bg-gray-600 py-2 px-4 rounded-md">
        Assignments reset every Monday at 12 AM
      </p>
    </div>
  );
};

export default Home
