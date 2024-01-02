const getDeskBookings = require("./deskBookings");
const getDaysOfAbsence = require("./daysOfAbsence");
const getReportInterval = require("./reportInterval");
const getExpectedBookings = require("./expectedBookings");

// iterate over the location data and check for number of desk bookings in condeco data
const generateReport = async (
  condeco,
  location,
  dayforce,
  startDate,
  endDate
) => {
  const reportInterval = getReportInterval(startDate, endDate);
  const condecoData = await condeco;
  const locationData = await location;
  const dayforceData = await dayforce;
  const allEmployeesReport = locationData.map((employee) => {
    const deskBookings = condecoData[employee.name];
    return {
      name: employee.name,
      location: employee.location,
      site: employee.site,
      email: employee.email,
      district: employee.district,
      manager: employee.manager,
      deskBookings: deskBookings
        ? getDeskBookings(deskBookings, reportInterval)
        : 0,
      expectedBookings: getExpectedBookings(
        dayforceData[employee.name],
        reportInterval
      ),
      daysOfAbsence: getDaysOfAbsence(
        dayforceData[employee.name],
        reportInterval
      ),
    };
  });

  // filter by quota met
  const quotaAllMetEmployees = [];
  const quotaAllNotMetEmployees = [];

  Object.values(allEmployeesReport).forEach((employee) => {
    if (employee.deskBookings >= employee.expectedBookings) {
      quotaAllMetEmployees.push(employee);
    } else {
      quotaAllNotMetEmployees.push(employee);
    }
  });

  // calculate percentage of quota met
  const quotaAllPercentageMet = Math.round(
    (quotaAllMetEmployees.length / allEmployeesReport.length) * 100
  );

  // calculate percentage of quota not met
  const quotaAllPercentageNotMet = 100 - quotaAllPercentageMet;

  
  // group by district
const districtGroupsAll = allEmployeesReport.reduce((districts, employee) => {
  // Check if the district is 'shared services' and the site contains 'operations'
  const districtKey =
    employee.district.toLowerCase() === 'shared services' &&
    employee.site.toLowerCase().includes('operations')
      ? 'Operations'
      : employee.district;

  if (districts[districtKey]) {
    districts[districtKey].push(employee);
  } else {
    districts[districtKey] = [employee];
  }
  return districts;
}, {});


  return [districtGroupsAll, quotaAllNotMetEmployees, quotaAllMetEmployees, quotaAllPercentageMet, quotaAllPercentageNotMet];
};

module.exports = generateReport;