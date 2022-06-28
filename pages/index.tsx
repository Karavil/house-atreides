import type { NextPage } from 'next'
import { DayToUserAssignment } from "../components/DayToUserAssignment";
import { DayToUserAssignmentTable } from "../components/DayToUserAssignmentTable";
import { getDateForNYC, snapToSunday } from "../util/calendar";
import { generateWeeklySeed, randomWithSeed } from "../util/random";

const USERS = ["Alp", "Erik", "Adam", "Grace", "Shelby"];

type User = typeof USERS[number];

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

const DAYS_WITH_ORDER_METADATA = [...DAYS].map((day, i) => ({
  day,
  sortOrderFirstWeek: randomWithSeed(generateWeeklySeed() * (i + 1)),
  sortOrderSecondWeek: randomWithSeed(generateWeeklySeed(1) * (i + 1)),
}));

const SHUFFLED_DAYS_THIS_WEEK = [...DAYS_WITH_ORDER_METADATA]
  .sort((a, b) => a.sortOrderFirstWeek - b.sortOrderSecondWeek)
  .map(({ day }) => day)
  // Only assign the first n shuffled days (we'll assign the rest as first come, first serve)
  .slice(0, USERS.length);

const SHUFFLED_DAYS_NEXT_WEEK = [...DAYS_WITH_ORDER_METADATA]
  .sort((a, b) => a.sortOrderSecondWeek - b.sortOrderFirstWeek)
  .map(({ day }) => day)
  .slice(0, USERS.length);

const [DAY_TO_USER_THIS_WEEK, DAY_TO_USER_NEXT_WEEK] = [
  SHUFFLED_DAYS_THIS_WEEK,
  SHUFFLED_DAYS_NEXT_WEEK,
].map((shuffledDays) =>
  shuffledDays.reduce((acc, day, index) => {
    acc[day] = USERS[index];
    return acc;
  }, {} as Partial<Record<Day, User>>)
);

const Home: NextPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-12">
        <div>
          <h1 className="font-bold">This week</h1>
          <DayToUserAssignmentTable dayToUserMap={DAY_TO_USER_THIS_WEEK} />
        </div>
        <div>
          <h1 className="font-bold">Next week</h1>
          <DayToUserAssignmentTable dayToUserMap={DAY_TO_USER_NEXT_WEEK} />
        </div>
      </div>
      <p className="text-gray-200 bg-gray-600 py-2 px-4 rounded-md">
        Assignments reset every Monday at 12 AM
      </p>
    </div>
  );
};

export default Home
