const luxon = require("luxon");
const DateTime = luxon.DateTime;

const getCondecoDateRange = async (condecoData) => {
  const data = await condecoData;
  const allDates = Object.values(data).flat();
  const convertedDates = allDates.map((dateString) => new Date(dateString));
  const minDate = new Date(Math.min(...convertedDates));
  const maxDate = new Date(Math.max(...convertedDates));
  return {
    minDate: DateTime.fromJSDate(minDate),
    maxDate: DateTime.fromJSDate(maxDate).plus(1),
  };
};

module.exports = getCondecoDateRange;