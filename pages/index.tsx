import Head from "next/head";
import { DayToUserAssignmentTable } from "../components/DayToUserAssignmentTable";
import { Card } from "../components/ui/Card";
import { SCHEDULE } from "../lib/const";
import { Schedule, ScheduleContext } from "../lib/context/schedule-context";
import { cN } from "../lib/util/style";

const Home = ({ schedule }: { schedule: Schedule }) => {
  return (
    <>
      <Head>
        <title>House Atreides</title>
      </Head>
      <ScheduleContext.Provider value={schedule}>
        <div className="px-6 py-8 md:px-10 md:py-8 flex flex-col gap-6">
          <h1 className="font-bold text-center sm:text-left text-[6vw] md:text-4xl text-white">
            Welcome to Caladan.
            <span className="mx-3">🌊 🦑</span>
          </h1>
          <div
            className={cN(
              "flex flex-col sm:flex-row flex-wrap items-start justify-center gap-3"
            )}
          >
            <div className="flex-[2] w-full">
              <Card
                title="Laundry day assignments"
                description="Weekends are first-come, first-serve. You have priority to do laundry on your assigned date; assignments are shuffled every Monday at 12 AM."
              >
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-12">
                  <div className="flex-1/2 w-full">
                    <h1 className="font-bold">This week</h1>
                    <DayToUserAssignmentTable
                      dayToUserMap={schedule.laundryPriority.thisWeek}
                    />
                  </div>
                  <div className="flex-1/2 w-full">
                    <h1 className="font-bold">Next week</h1>
                    <DayToUserAssignmentTable
                      dayToUserMap={schedule.laundryPriority.nextWeek}
                    />
                  </div>
                </div>
              </Card>
            </div>
            <div className="flex-[1] w-full">
              <Card
                title="Rent schedule"
                description="Rent is due at the start of each month — don't be late!"
              >
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://account.venmo.com/u/alpkv"
                >
                  <div
                    className={cN(
                      "flex flex-row justify-center items-center",
                      "rounded-md overflow-hidden",
                      "text-white h-8",
                      "w-max"
                    )}
                  >
                    <div className="h-full py-2 px-4 bg-blue-200">
                      <img
                        alt="Venmo logo"
                        className={cN("h-full")}
                        src="/assets/venmo-logo.svg"
                      />
                    </div>
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
      </ScheduleContext.Provider>
    </>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      schedule: SCHEDULE,
    },
  };
}

export default Home;
