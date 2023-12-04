export function prepareLineChartData(data) {
  const preparedData = {};

  data.forEach(item => {
    const { date, category, sold } = item;
    const day = new Date(date).getDate();

    if (!preparedData[day]) {
      preparedData[day] = {};
    }

    if (!preparedData[day][category]) {
      preparedData[day][category] = 0;
    }

    preparedData[day][category] += sold;
  });

  const resultArray = Object.entries(preparedData).map(([day, categories]) => {
    const resultObject = { day: day };
    Object.entries(categories).forEach(([category, totalSold]) => {
      resultObject[category] = totalSold;
    });
    return resultObject;
  });

  return resultArray;
}
