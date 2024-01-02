const XLSX = require('xlsx');
const path = require('path');

// Load the CondecoData file
const condecoWorkbook = XLSX.readFile(path.join(__dirname, '../', 'data', 'condecoData.xlsx'));
const condecoSheet = condecoWorkbook.Sheets['Sheet1'];
const condecoData = XLSX.utils.sheet_to_json(condecoSheet);

// Load the locationData file
const locationWorkbook = XLSX.readFile(path.join(__dirname, '../', 'data', 'locationData.xlsx'));
const locationSheet = locationWorkbook.Sheets['Sheet1'];
const locationData = XLSX.utils.sheet_to_json(locationSheet);

const condecoNames = new Set(condecoData.map(row => row['Allocated to']));
const locationNames = new Set(locationData.map(row => row['Full Name with Common First Name']));

// Find names that are in condecoData but not in locationData
const missingFromLocation = new Set([...condecoNames].filter(name => !locationNames.has(name)));

// Find names that are in locationData but not in condecoData
const missingFromCondeco = new Set([...locationNames].filter(name => !condecoNames.has(name)));

console.log('Names missing from locationData:', Array.from(missingFromLocation));
// console.log('Names missing from condecoData:', Array.from(missingFromCondeco));