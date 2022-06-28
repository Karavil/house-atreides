const NYC_TIMEZONE = "America/New_York";

export const getDateForNYC = (): Date => {
  const nycTime = new Date().toLocaleString("en-US", {
    timeZone: NYC_TIMEZONE,
  });
  return new Date(nycTime);
};

const isSunday = (date: Date): boolean => {
  return date.getDay() === 0;
};

// Snaps to the closest Monday.
export const snapToSunday = (date: Date): Date => {
  const dateCopy = new Date(date);

  // Clear all units less than the day so millisecond
  // computation is deterministic after snapping to Mondays.
  dateCopy.setHours(0, 0, 0, 0);

  // Loop until we hit a monday, we can probably calculate this
  // using modulo, but w/e.
  while (!isSunday(dateCopy)) {
    dateCopy.setDate(dateCopy.getDate() + 1);
  }

  return dateCopy;
};
