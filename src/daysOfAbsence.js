const luxon = require("luxon");
const { Interval } = require("luxon");
const DateTime = luxon.DateTime;

const getDaysOfAbsence = (employeeDayforceData, interval) => {
  // Include last day of interval in calculation
  const intervalPlusOne = Interval.fromDateTimes(
    interval.start,
    interval.end.plus({ days: 1 })
  );
  if (employeeDayforceData === undefined) {
    return 0;
  }
  const filteredDaysOff = [];
  const daysOfWeeks = [];
  for (const day of employeeDayforceData) {
    const [year, month, date] = day.split("-");
    const luxonDate = DateTime.fromObject({
      year: year,
      month: month,
      day: date,
    });
    const dayOfWeek = luxonDate.weekday;
    daysOfWeeks.push(dayOfWeek);
    if (
      intervalPlusOne.contains(luxonDate) &&
      dayOfWeek !== 6 &&
      dayOfWeek !== 7
    ) {
      filteredDaysOff.push(day);
    }
  }
  return filteredDaysOff.length;
};

module.exports = getDaysOfAbsence;