import type { NextPage } from 'next'
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

const DAYS_WITH_ORDER_METADATA = [...DAYS].map((day, i) => ({
  day,
  sortOrderFirstWeek: randomWithSeed(generateWeeklySeed() * (i + 1)),
  sortOrderSecondWeek: randomWithSeed(generateWeeklySeed(1) * (i + 1)),
}));

const SHUFFLED_DAYS_THIS_WEEK = [...DAYS_WITH_ORDER_METADATA]
  .sort((a, b) => a.sortOrderFirstWeek - b.sortOrderFirstWeek)
  .map(({ day }) => day)
  // Only assign the first n shuffled days (we'll assign the rest as first come, first serve)
  .slice(0, USERS.length);

const SHUFFLED_DAYS_NEXT_WEEK = [...DAYS_WITH_ORDER_METADATA]
  .sort((a, b) => a.sortOrderSecondWeek - b.sortOrderSecondWeek)
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

const VENMO_COLOR_HEX = "#008CFF";

const Home = ({
  dayToUserThisWeek,
  dayToUserNextWeek,
}: {
  dayToUserThisWeek: Partial<Record<Day, User>>;
  dayToUserNextWeek: Partial<Record<Day, User>>;
}) => {
  return (
    <div
      className={cN(
        "max-w-2xl mx-auto min-h-[100vh]",
        "flex flex-col items-center justify-center gap-8",
        "p-4"
      )}
    >
      <Card
        title="Laundry day assignments"
        description="You have priority to do laundry on your assigned date! Assignments are updated every Monday at 12 AM."
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
