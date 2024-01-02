const fs = require("fs");
const convertCondecoData = require("./condeco");
const convertedLocationData = require("./location");
const convertedDayforceData = require("./dayforce");
const calculateQuotaMetPerDistrict = require("./quotaPerDistrict");
const generateReport = require("./generateReport");
const checkDateRange = require("./checkDateRange");

const startDate = process.argv[2];
const endDate = process.argv[3];

checkDateRange(startDate, endDate).then((dateRangeCheckResult) => {
  if (!dateRangeCheckResult) {
    console.error(
      "Date range does not fall within the Dayforce and Condeco date ranges"
    );
  } else {
    generateReport(
      convertCondecoData(),
      convertedLocationData,
      convertedDayforceData,
      startDate,
      endDate
    ).then(
      // generate multiple csv files using report by district
      ([districtGroupsAll, quotaAllNotMetEmployees, quotaAllMetEmployees, quotaAllPercentageMet, quotaAllPercentageNotMet]) => {
        if (!districtGroupsAll) {
          console.log("Invalid date range");
          return;
        }
        Object.keys(districtGroupsAll).forEach((district) => {
          // sort by quota met/not met and provide percentage of quota met and not met
          const { percentageMet, quotaMetEmployees, percentageNotMet, quotaNotMetEmployees } =
            calculateQuotaMetPerDistrict(districtGroupsAll, district);

          // generate csv file for each district
          const districtReportNotMet = quotaNotMetEmployees.reduce((acc, employee) => {
            acc += `${employee.name},${employee.location},${employee.email},${employee.daysOfAbsence},${employee.deskBookings},${employee.expectedBookings},${employee.manager}\n`;
            return acc;
          }, `${percentageNotMet}% of employees did not meet their quota\n\nEmployee,Location,Email,Days Off,Desk Bookings,Expected Bookings,Manager\n`);

          const districtReportMet = quotaMetEmployees.reduce((acc, employee) => {
            acc += `${employee.name},${employee.location},${employee.email},${employee.daysOfAbsence},${employee.deskBookings},${employee.expectedBookings},${employee.manager}\n`;
            return acc;
          }, `${percentageMet}% of employees met their quota\n\nEmployee,Location,Email,Days Off,Desk Bookings,Expected Bookings,Manager\n`);

          csv = districtReportNotMet + '\n' + districtReportMet;

          fs.writeFile(
            `../reports/${district}-${process.argv[2]}-${process.argv[3]}.csv`,
            csv,
            (err) => {
              if (err) throw err;
              console.log(`${district} report saved!`);
            }
          );
        });

        // generate  csv file for all employees
        const reportAllNotMet = quotaAllNotMetEmployees.reduce((acc, employee) => {
          acc += `${employee.name},${employee.location},${employee.email},${employee.daysOfAbsence},${employee.deskBookings},${employee.expectedBookings},${employee.manager}\n`;
          return acc;
        }, `${quotaAllPercentageNotMet}% of all employees did not meet their quota\n\nEmployee,Location,Email,Days Off,Desk Bookings,Expected Bookings,Manager\n`);

        const reportAllMet = quotaAllMetEmployees.reduce((acc, employee) => {
          acc += `${employee.name},${employee.location},${employee.email},${employee.daysOfAbsence},${employee.deskBookings},${employee.expectedBookings},${employee.manager}\n`;
          return acc;
        }, `${quotaAllPercentageMet}% of all employees met their quota\n\nEmployee,Location,Email,Days Off,Desk Bookings,Expected Bookings,Manager\n`);

        csvAll = reportAllNotMet + '\n' + reportAllMet
        fs.writeFile(
          `../reports/All Employees-${process.argv[2]}-${process.argv[3]}.csv`,
          csvAll,
          (err) => {
            if (err) throw err;
            console.log(`All Employees report saved!`);
          }
        );
      }
    );
  }
});
