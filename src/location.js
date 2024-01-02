const readXlsxFile = require("read-excel-file/node");
const _ = require("lodash");

const map = {
  "Full Name with Common First Name": "name",
  "Working Location": "location",
  "Business Email": "email",
  District: "district",
  "Manager Display Name": "manager",
  "Site":'site'
};

const exemptions = [];

const convertedLocationData = readXlsxFile("../data/locationData.xlsx", {
  map,
}).then(({ rows }) => {
  const filteredData = rows.filter(
    (row) =>
      !row.location.includes("Homeworker") &&
      !row.location.includes("Talbot Green") &&
      !row.location.includes("HK") &&
      !row.location.includes("UAE") &&
      _.intersection([row.name], exemptions).length === 0
  );
  return filteredData;
});

module.exports = convertedLocationData;
