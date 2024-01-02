const mockCondecoData = {
  // John booked a desk for twelve days in the month of September 2023 (no annual leave)
  John: [
    "Mon Sep 04 2023",
    "Tue Sep 05 2023",
    "Wed Sep 06 2023",
    "Mon Sep 11 2023",
    "Tue Sep 12 2023",
    "Wed Sep 13 2023",
    "Mon Sep 18 2023",
    "Tue Sep 19 2023",
    "Wed Sep 20 2023",
    "Mon Sep 25 2023",
    "Tue Sep 26 2023",
    "Wed Sep 27 2023",
  ],
  // Jane booked a desk for ten days in the month of September 2023 (no annual leave)
  Jane: [
    "Tue Sep 05 2023",
    "Wed Sep 06 2023",
    "Mon Sep 11 2023",
    "Tue Sep 12 2023",
    "Wed Sep 13 2023",
    "Mon Sep 18 2023",
    "Tue Sep 19 2023",
    "Wed Sep 20 2023",
    "Tue Sep 26 2023",
    "Wed Sep 27 2023",
  ],
  // Joe didn't book a desk for the month of September 2023 (full month of annual leave)
  Joe: [],
  // Jack booked a desk for 9 days in the month of September 2023 (four days of annual leave)
  Jack: [
    "Mon Sep 04 2023",
    "Tue Sep 05 2023",
    "Mon Sep 11 2023",
    "Tue Sep 12 2023",
    "Wed Sep 13 2023",
    "Mon Sep 18 2023",
    "Tue Sep 19 2023",
    "Wed Sep 20 2023",
    "Mon Sep 25 2023",
  ],
  // Jill booked a desk for 7 days in the month of September 2023 (week of annual leave)
  Jill: [
    "Mon Sep 04 2023",
    "Tue Sep 05 2023",
    "Wed Sep 06 2023",
    "Thu Sep 07 2023",
    "Fri Sep 08 2023",
    "Mon Sep 11 2023",
    "Tue Sep 12 2023",
  ],
};

module.exports = mockCondecoData;