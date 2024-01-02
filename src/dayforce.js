const luxon = require('luxon');
const DateTime = luxon.DateTime;
const readXlsxFile = require('read-excel-file/node');

const map = {
  'Name': 'name',
  'Start': 'startDate',
  'End': 'endDate',
}

// Function that converts an excel date to a JS date
const excelDateToJSDate = (excelDate) => {
  return new Date(Math.round((excelDate - 25569)*86400*1000));
}

const getHolidayDays = (startDate, endDate) => {
  const start = DateTime.fromJSDate(startDate);
  const end = DateTime.fromJSDate(endDate);
  const days = [];
  for (let i = start; i < end; i = i.plus({ days: 1 })) {
    days.push(i.toISODate());
  }
  return days;
};

const convertedDayforceData = readXlsxFile('../data/dayforceData.xlsx', { map, transformData(data) {
  data.shift();
  return data;
}}).then(( { rows, errors } ) => {
  // group by name
  const nameGroups = rows.reduce((names, employee) => {
    if (names[employee.name]) {
      names[employee.name].push(getHolidayDays(excelDateToJSDate(employee.startDate), excelDateToJSDate(employee.endDate)));
    } else {
      names[employee.name] = [getHolidayDays(excelDateToJSDate(employee.startDate), excelDateToJSDate(employee.endDate))];
    }
    // iterate through names and flatten arrays
    return Object.keys(names).reduce((acc, name) => {acc[name] = names[name].flat(); return acc;}, {});
  }, {});
  return nameGroups;
});

module.exports = convertedDayforceData;