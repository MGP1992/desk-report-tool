const luxon = require('luxon');
const DateTime = luxon.DateTime;
const readXlsxFile = require('read-excel-file/node');

const dayforceDateRange = readXlsxFile('../data/dayforceData.xlsx').then((rows) => {
  const dateRangeString = rows[0][0];
  const [startDateStr, endDateStr] = dateRangeString
    .substring(0, 35)
    .replace('Date Range: ', '')
    .split(' - ');
  const startDate = DateTime.fromFormat(startDateStr, 'dd/MM/yyyy');
  const endDate = DateTime.fromFormat(endDateStr, 'dd/MM/yyyy');
  const formattedDates = {
    minDate: startDate,
    maxDate: endDate,
  };
  return formattedDates;
  });

module.exports = dayforceDateRange;