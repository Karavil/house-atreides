import type { NextPage } from 'next'
import Head from "next/head";
import { DayToUserAssignment } from "../components/DayToUserAssignment";
import { DayToUserAssignmentTable } from "../components/DayToUserAssignmentTable";
import { Card } from "../components/ui/Card";
import { getDateForNYC, snapToSunday } from "../util/calendar";
import { generateWeeklySeed, randomWithSeed } from "../util/random";
import { cN } from "../util/style";

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

const WEEKEND_DAYS: Set<Day> = new Set(["Saturday", "Sunday"] as const);
const DAYS_TO_ASSIGN = new Set(DAYS.filter((day) => !WEEKEND_DAYS.has(day)));

const DAYS_WITH_ORDER_METADATA = [...DAYS].map((day, i) => ({
  day,
  sortOrderFirstWeek: randomWithSeed(generateWeeklySeed() * (i + 1)),
  sortOrderSecondWeek: randomWithSeed(generateWeeklySeed(1) * (i + 1)),
}));

const [SHUFFLED_DAYS_THIS_WEEK, SHUFFLED_DAYS_NEXT_WEEK] = (
  ["FirstWeek", "SecondWeek"] as const
).map((week) =>
  [...DAYS_WITH_ORDER_METADATA]
    // Filter out days we don't want to assign to users
    .filter(({ day }) => DAYS_TO_ASSIGN.has(day))
    .sort((a, b) => a[`sortOrder${week}`] - b[`sortOrder${week}`])
    .map(({ day }) => day)
    // Only assign the first n shuffled days (we'll assign the rest as first come, first serve)
    .slice(0, USERS.length)
);


const [DAY_TO_USER_THIS_WEEK, DAY_TO_USER_NEXT_WEEK] = [
  SHUFFLED_DAYS_THIS_WEEK,
  SHUFFLED_DAYS_NEXT_WEEK,
].map((shuffledDays) =>
  shuffledDays.reduce((acc, day, index) => {
    acc[day] = USERS[index];
    return acc;
  }, {} as Partial<Record<Day, User>>)
);

const Home = ({
  dayToUserThisWeek,
  dayToUserNextWeek,
}: {
  dayToUserThisWeek: Partial<Record<Day, User>>;
  dayToUserNextWeek: Partial<Record<Day, User>>;
}) => {
  return (
    <>
      <Head>
        <title>House Atreides</title>
      </Head>
      <div className="px-6 py-8 md:px-10 md:py-8 flex flex-col gap-6">
        <h1 className="font-bold text-center sm:text-left text-[6vw] md:text-4xl text-white">
          Welcome to Caladan.
          <span className="mx-3">🌊 🦑</span>
        </h1>
        <div
          className={cN(
            "flex flex-row flex-wrap items-start justify-center gap-4"
          )}
        >
          <div className="flex-[2]">
            <Card
              title="Laundry day assignments"
              description="Weekends are first-come, first-serve. You have priority to do laundry on your assigned date; assignments are shuffled every Monday at 12 AM."
            >
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-12">
                <div className="flex-1/2 w-full">
                  <h1 className="font-bold">This week</h1>
                  <DayToUserAssignmentTable dayToUserMap={dayToUserThisWeek} />
                </div>
                <div className="flex-1/2 w-full">
                  <h1 className="font-bold">Next week</h1>
                  <DayToUserAssignmentTable dayToUserMap={dayToUserNextWeek} />
                </div>
              </div>
            </Card>
          </div>
          <div className="flex-[1]">
            <Card
              title="Rent schedule"
              description="Rent is due at the start of each month — don't be late!"
            >
              <a
                rel="noreferrer"
                target="_blank"
                href="https://venmo.com/code?user_id=2307190153019392968&created=1656457085.845623&printed=1"
              >
                <div
                  className={cN(
                    "flex flex-row justify-center items-center",
                    "rounded-md overflow-hidden",
                    "text-white h-8",
                    "w-max"
                  )}
                >
                  <img
                    alt="Venmo logo"
                    className={cN("h-full py-2.5 px-4", "bg-blue-200 ")}
                    src="/assets/venmo-logo.svg"
                  />
                  <span
                    className={cN(
                      "h-full flex justify-center items-center",
                      "bg-blue-900 text-blue-100",
                      "px-4",
                      "font-mono text-sm"
                    )}
                  >
                    @alpkv
                  </span>
                </div>
              </a>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      dayToUserThisWeek: DAY_TO_USER_THIS_WEEK,
      dayToUserNextWeek: DAY_TO_USER_NEXT_WEEK,
    },
  };
}

export default Home
