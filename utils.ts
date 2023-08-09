export const getDatesSince = (msAgo: number) => {
  const dates = [];
  const now = Date.now();
  const start = new Date(now - msAgo);

  while (+start < now) {
    start.setDate(start.getDate() + 1);
    dates.push(new Date(start).toISOString().split("T")[0]);
  }

  return dates;
};
