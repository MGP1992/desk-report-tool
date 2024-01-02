const readXlsxFile = require('read-excel-file/node');

const map = {
  'Allocated to': 'employee',
  'Username': 'username',
  'Email': 'email',
  'Start Date': 'startDate',
  'Until Date': 'endDate',
}

const convertCondecoData = async () => {
  const { rows } = await readXlsxFile('../data/condecoData.xlsx', { map });
  const reducerData = rows.reduce((bookingByEmployee, booking) => {
    const { employee, startDate } = booking;
    if (bookingByEmployee[employee]) {
      !bookingByEmployee[employee].includes(startDate.toDateString())
      && bookingByEmployee[employee].push(startDate.toDateString());
    } else {
      bookingByEmployee[employee] = [startDate.toDateString()];
    }
    return bookingByEmployee;
  }, {});
  return reducerData;
};

module.exports = convertCondecoData;