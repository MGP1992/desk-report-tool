const luxon = require("luxon");
const { Interval } = require("luxon");
const DateTime = luxon.DateTime;

// Function that creates interval for date range input
const getReportInterval = (startDateStr, endDateStr) => {
  const startDate = DateTime.fromFormat(startDateStr, "yyyy-MM-dd");
  const endDate = DateTime.fromFormat(endDateStr, "yyyy-MM-dd");
  return Interval.fromDateTimes(startDate, endDate);
};

module.exports = getReportInterval;