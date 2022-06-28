export const DayToUserAssignment = ({ user }: { user?: string }) => {
  return (
    <span className="whitespace-nowrap">
      {user ?? <i className="text-slate-500">First come, first serve</i>}
    </span>
  );
};
