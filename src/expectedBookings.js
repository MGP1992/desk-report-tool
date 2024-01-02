const luxon = require("luxon");
const Interval = luxon.Interval;
const DateTime = luxon.DateTime;

const getExpectedBookings = (employeeDayforceData, interval) => {
  let expectedBookings = 0;
  // Include last day of interval in calculation
  const intervalPlusOne = Interval.fromDateTimes(interval.start, interval.end.plus({ days: 1 }));

  // function to determine the defaultExpectedBookings based on a rule of three days per week for the reportInterval
  const getDefaultExpectedBookings = (reportInterval, startDayOfWeek = 1) => {
    let workingDays = 0;
    let currentDate = reportInterval.start;
    while (currentDate <= reportInterval.end) {
      if (currentDate.weekday !== 6 && currentDate.weekday !== 7) {
        workingDays++;
      }
      currentDate = currentDate.plus({ days: 1 });
    }
    const expectedBookings = Math.floor(workingDays * 0.6);
    return expectedBookings;
  };

  expectedBookings = getDefaultExpectedBookings(intervalPlusOne);

  if (employeeDayforceData === undefined) {
    return expectedBookings;
  }
  // iterates over data and remove any day that is a Saturday or a Sunday
  const filteredDaysOff = employeeDayforceData.filter((day) => {
    const date = DateTime.fromFormat(day, "yyyy-MM-dd");
    return intervalPlusOne.contains(date) && date.weekday !== 6 && date.weekday !== 7;
  });
  // groups days by week
  const weekGroups = filteredDaysOff.reduce((weeks, day) => {
    const date = DateTime.fromFormat(day, "yyyy-MM-dd");
    const week = date.weekNumber;
    if (weeks[week]) {
      weeks[week].push(day);
    } else {
      weeks[week] = [day];
    }
    return weeks;
  }, {});

  // iterates over weekGroups and if days is 4 deduct 3 from expectedBookings,
  // if days is 3 deduct 2 from expectedBookings,
  // if days is 2 deduct 1 from expectedBookings,
  // if days is 1 deduct 1 from expectedBookings
  Object.keys(weekGroups).forEach((week) => {
    const days = weekGroups[week].length;
    if (days >= 4) {
      expectedBookings -= 3;
    } else if (days === 3) {
      expectedBookings -= 2;
    } else if (days === 2) {
      expectedBookings -= 1;
    } else if (days === 1) {
      expectedBookings -= 1;
    }
  });
  if (expectedBookings < 0) {
    return 0;
  }
  return expectedBookings;
};

module.exports = getExpectedBookings;