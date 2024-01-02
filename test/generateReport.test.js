const generateReport = require("../src/generateReport");
const mockCondecoData = require("./mockCondecoData");
const mockDayforceData = require("./mockDayforceData");
const mockLocationData = require("./mockLocationData");

const checkEmployeeNames = (arr, expectedNames) => {
  return arr.every(employee => expectedNames.includes(employee.name));
};

describe("generateReport", () => {
  test("returns the expected data for a month-long period", async () => {
    const expectedEmployeeKeys = [
      'name',
      'location',
      'site',
      'email',
      'district',
      'manager',
      'deskBookings',
      'expectedBookings',
      'daysOfAbsence',
  ];

    const report = await generateReport(
      mockCondecoData,
      mockLocationData,
      mockDayforceData,
      "2023-09-01",
      "2023-09-30"
    );

    const districtGroupsAll = report[0];
    const districtCentral = districtGroupsAll.Central;
    const employeeJohn = districtCentral[0];
    const employeeJane = districtCentral[1];
    const districtTechnology = districtGroupsAll.Technology;
    const employeeJoe = districtTechnology[0];
    const employeeJack = districtTechnology[1];
    const employeeJill = districtTechnology[2];
    const quotaAllNotMetEmployees = report[1];
    const quotaAllMetEmployees = report[2];
    const quotaAllPercentageMet = report[3];
    const quotaAllPercentageNotMet = report[4];

    expect(report.length).toEqual(5);

    expect(districtCentral.length).toEqual(2);
    expect(checkEmployeeNames(districtCentral, ["John", "Jane"])).toBe(true);

    expect(districtTechnology.length).toEqual(3);
    expect(checkEmployeeNames(districtTechnology, ["Joe", "Jack", "Jill"])).toBe(true);

    expect(employeeJohn).toHaveProperty(...expectedEmployeeKeys);
    expect (employeeJohn.deskBookings).toEqual(12);
    expect (employeeJohn.expectedBookings).toEqual(12);
    expect (employeeJohn.daysOfAbsence).toEqual(0);

    expect (employeeJane).toHaveProperty(...expectedEmployeeKeys);
    expect (employeeJane.deskBookings).toEqual(10);
    expect (employeeJane.expectedBookings).toEqual(12);
    expect (employeeJane.daysOfAbsence).toEqual(0);

    expect (employeeJoe).toHaveProperty(...expectedEmployeeKeys);
    expect (employeeJoe.deskBookings).toEqual(0);
    expect (employeeJoe.expectedBookings).toEqual(0);
    expect (employeeJoe.daysOfAbsence).toEqual(21);

    expect (employeeJack).toHaveProperty(...expectedEmployeeKeys);
    expect (employeeJack.deskBookings).toEqual(9);
    expect (employeeJack.expectedBookings).toEqual(9);
    expect (employeeJack.daysOfAbsence).toEqual(4);

    expect (employeeJill).toHaveProperty(...expectedEmployeeKeys);
    expect (employeeJill.deskBookings).toEqual(7);
    expect (employeeJill.expectedBookings).toEqual(9);
    expect (employeeJill.daysOfAbsence).toEqual(5);

    expect(quotaAllNotMetEmployees.length).toEqual(2);
    expect(checkEmployeeNames(quotaAllNotMetEmployees, ["Jane", "Jill"])).toBe(true);

    expect(quotaAllMetEmployees.length).toEqual(3);
    expect(checkEmployeeNames(quotaAllMetEmployees, ["John", "Joe", "Jack"])).toBe(true);

    expect(quotaAllPercentageMet).toEqual(60);
    expect(quotaAllPercentageNotMet).toEqual(40);
  });

  test("returns accurate reports for a week-long period", async () => {
    const report = await generateReport(
      mockCondecoData,
      mockLocationData,
      mockDayforceData,
      "2023-09-04",
      "2023-09-08"
    );

    const districtGroupsAll = report[0];
    const districtCentral = districtGroupsAll.Central;
    const districtTechnology = districtGroupsAll.Technology;
    const quotaAllNotMetEmployees = report[1];
    const quotaAllMetEmployees = report[2];
    const quotaAllPercentageMet = report[3];
    const quotaAllPercentageNotMet = report[4];

    expect(report.length).toEqual(5);
    expect(districtCentral.length).toEqual(2);
    expect(districtTechnology.length).toEqual(3);
    expect(quotaAllNotMetEmployees.length).toEqual(1);
    expect(checkEmployeeNames(quotaAllNotMetEmployees, ["Jane"])).toBe(true);
    expect(quotaAllMetEmployees.length).toEqual(4);
    expect(checkEmployeeNames(quotaAllMetEmployees, ["John", "Joe", "Jack", "Jill"])).toBe(true);
    expect(quotaAllPercentageMet).toEqual(80);
    expect(quotaAllPercentageNotMet).toEqual(20);
  });

  test("returns accurate reports for a second week-long period", async () => {
    const report = await generateReport(
      mockCondecoData,
      mockLocationData,
      mockDayforceData,
      "2023-09-18",
      "2023-09-22"
    );

    const districtGroupsAll = report[0];
    const districtCentral = districtGroupsAll.Central;
    const districtTechnology = districtGroupsAll.Technology;
    const quotaAllNotMetEmployees = report[1];
    const quotaAllMetEmployees = report[2];
    const quotaAllPercentageMet = report[3];
    const quotaAllPercentageNotMet = report[4];

    expect(report.length).toEqual(5);
    expect(districtCentral.length).toEqual(2);
    expect(districtTechnology.length).toEqual(3);
    expect(quotaAllNotMetEmployees.length).toEqual(0);
    expect(quotaAllMetEmployees.length).toEqual(5);
    expect(quotaAllPercentageMet).toEqual(100);
    expect(quotaAllPercentageNotMet).toEqual(0);
  });

  test("returns accurate reports for a third week-long period", async () => {
    const report = await generateReport(
      mockCondecoData,
      mockLocationData,
      mockDayforceData,
      "2023-09-25",
      "2023-09-29"
    );

    const districtGroupsAll = report[0];
    const districtCentral = districtGroupsAll.Central;
    const districtTechnology = districtGroupsAll.Technology;
    const quotaAllNotMetEmployees = report[1];
    const quotaAllMetEmployees = report[2];
    const quotaAllPercentageMet = report[3];
    const quotaAllPercentageNotMet = report[4];

    expect(report.length).toEqual(5);
    expect(districtCentral.length).toEqual(2);
    expect(districtTechnology.length).toEqual(3);
    expect(quotaAllNotMetEmployees.length).toEqual(2);
    expect(checkEmployeeNames(quotaAllNotMetEmployees, ["Jane", "Jill"])).toBe(true);
    expect(quotaAllMetEmployees.length).toEqual(3);
    expect(checkEmployeeNames(quotaAllMetEmployees, ["John", "Joe", "Jack"])).toBe(true);
    expect(quotaAllPercentageMet).toEqual(60);
    expect(quotaAllPercentageNotMet).toEqual(40);
  });
});
