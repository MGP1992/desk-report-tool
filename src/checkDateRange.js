const dayforceDateRange = require("./dayforceDateRange");
const condecoDateRange = require("./condecoDateRange");
const convertCondecoData = require("./condeco");
const luxon = require("luxon");
const { Interval } = require("luxon");
const DateTime = luxon.DateTime;

// Function that accepts two date strings
// and check if date range falls within the dayforce date range
// and condeco date range
const checkDateRange = async (startDateStr, endDateStr) => {
  const dayforceDates = await dayforceDateRange;
  const condecoDates = await condecoDateRange(convertCondecoData());
  const startDate = DateTime.fromFormat(startDateStr, "yyyy-MM-dd");
  const endDate = DateTime.fromFormat(endDateStr, "yyyy-MM-dd");
  const dayforceInterval = Interval.fromDateTimes(
    dayforceDates.minDate,
    dayforceDates.maxDate.plus({ days: 1 })
  );
  const condecoInterval = Interval.fromDateTimes(
    condecoDates.minDate,
    condecoDates.maxDate.plus({ days: 1 })
  );
  const isDayforceDateRange =
    dayforceInterval.contains(startDate) && dayforceInterval.contains(endDate);
  const isCondecoDateRange =
    condecoInterval.contains(startDate) && condecoInterval.contains(endDate);
  return isDayforceDateRange && isCondecoDateRange;
};

module.exports = checkDateRange;