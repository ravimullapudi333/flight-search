export const isDateEqual = (date1, date2) => {
  const d1 = new Date(date1);
  d1.setHours(0, 0, 0, 0);
  const d2 = new Date(date2);
  d2.setHours(0, 0, 0, 0);

  return d1.getTime() === d2.getTime();
};

export const getDiffInMinutes = (time1, time2) => {
  const d1 = new Date();
  const d2 = new Date();
  d1.setHours(time1.split(':')[0], time1.split(':')[1]);
  d2.setHours(time2.split(':')[0], time2.split(':')[1]);
  const secondsDiff = d1.getTime() - d2.getTime();
  let seconds = Math.floor(secondsDiff / 1000);
  return Math.floor(seconds / 60);
};

export const getDiffInHours = (time1, time2) => {
  let minute = getDiffInMinutes(time1, time2);
  let hour = Math.floor(minute / 60);
  minute = minute % 60;
  return `${hour}h ${minute}m`;
};
