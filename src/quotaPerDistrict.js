const calculateQuotaMetPerDistrict = (report, district) => {
  const quotaMetEmployees = [];
  const quotaNotMetEmployees = [];
  
  Object.values(report[district]).forEach((employee) => {
    if (employee.deskBookings >= employee.expectedBookings) {
      quotaMetEmployees.push(employee);
    } else {
      quotaNotMetEmployees.push(employee);
    }
  });

  const percentageMet = Math.round(
    (quotaMetEmployees.length / report[district].length) * 100
  );

  const percentageNotMet = 100 - percentageMet;

  return {percentageMet,quotaMetEmployees, quotaNotMetEmployees, percentageNotMet};
};

module.exports = calculateQuotaMetPerDistrict;