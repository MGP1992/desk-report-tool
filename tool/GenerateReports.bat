@echo off
rem Get the directory where this batch file is located
set "batchDir=%~dp0"

set /p startDate= "Please enter the start date in the format yyyy-mm-dd :" 
echo '%startDate%'

set /p endDate= "Please enter the end date in the format yyyy-mm-dd :" 
echo '%endDate%'

rem Run generateReport.js via binary installation of node.js
cd "%batchDir%dist"
"%batchDir%bin/node/node.exe" "main.js" %startDate% %endDate%

rem pause command to leave command prompt open
pause
