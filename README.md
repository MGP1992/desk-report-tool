# desk-report-tool

## Description

An internal tool for generating .csv reports for desk bookings per employee both company wide and for each district at Tes over a given time period.

The application still involves some manual processes, but it has been simplified as much as possible bearing in mind the lack of access to data endpoints.

## Installation

```bash
$ npm install
```

## Build the app

```bash
$ npm run build
```

## How it works

This app is designed to work for non-developer users using Windows operating system machines.

Once the app has been built, the 'tool' directory must be zipped up manually and forwarded to the user.

The user is provided with the following when passed this directory:

1. A pre-installed copy of node 18 (located in bin/node);
2. An empty data folder (where ther user must store the three .xlsx files necessary for the app to run);
3. An empty reports folder, where any reports generated by the app will be saved;
4. A dist folder containing the bundled js;
5. A GenerateReport.bat file, which runs the js via a CLI;
6. A pdf copy of the user guide.

Once the user has placed the correct files in the 'data' folder and named these correctly (all of this is covered in the guide), all they need to do is run the .bat file, enter a start date and end date when prompted, and the reports will be generated for that period.

_<strong>Notes</strong>:_

_- Please update the user guide when necessary. It exists in two forms in the root directory, guide.md and guide.docx, so that a PDF copy (located in the 'tool' directory) can be provided to the user without too much hassle._

_- It is up to the user to provide the app with the data necessary for it to run (in the form of three .xlsx files). See the user guide for details._

## Still to do

1. Add validation to user inputs (use node package for input);
2. Automate data-gathering and report process (moonshot).