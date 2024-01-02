const luxon = require("luxon");
const Interval = luxon.Interval;
const DateTime = luxon.DateTime;

// function that returns the number of condeco bookings in the report interval
const getDeskBookings = (condecoData, interval) => {
  if (condecoData === undefined) {
    return 0;
  }
  const allDates = Object.values(condecoData).flat();
  const convertedDates = allDates.map((dateString) => new Date(dateString));
  // add one day to the end of the interval to include the end date
  const intervalPlusOne = Interval.fromDateTimes(interval.start, interval.end.plus({ days: 1 }));
  const bookings = convertedDates.filter((date) => {
    return intervalPlusOne.contains(DateTime.fromJSDate(date));
  }
  );
  return bookings.length;
};

module.exports = getDeskBookings;