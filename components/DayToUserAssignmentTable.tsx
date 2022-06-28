import { Day, DAYS } from "../pages";
import { DayToUserAssignment } from "./DayToUserAssignment";

export const DayToUserAssignmentTable = ({
  dayToUserMap,
}: {
  dayToUserMap: Partial<Record<Day, string>>;
}) => {
  return (
    <div className="w-full divide-y">
      {DAYS.map((day) => (
        <div className="flex flex-row justify-between gap-12 py-2" key={day}>
          <div className="flex flex-col">
            <h1>{day}</h1>
          </div>
          <div className="flex flex-col items-end">
            <DayToUserAssignment user={dayToUserMap[day]} />
          </div>
        </div>
      ))}
    </div>
  );
};
