import { add } from 'date-fns';

const zonedTimeToUtc = (date: Date) => {
  const timezoneOffset = date.getTimezoneOffset();
  return add(date, { minutes: timezoneOffset });
};

export default zonedTimeToUtc;
