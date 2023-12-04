export function prepareCompareLineChartData(data, selectedProducts) {
  const preparedData = {};

  data.forEach(item => {
    const { date, sold, name } = item;
    const day = new Date(date).getDate();

    if (!preparedData[day]) {
      preparedData[day] = {};
    }

    if (!preparedData[day][name]) {
      preparedData[day][name] = 0;
    }

    preparedData[day][name] += sold;
  });

  const resultArray = Object.entries(preparedData).map(([day, products]) => {
    const resultObject = { day: day };
    selectedProducts.forEach(product => {
      resultObject[product.name] = products[product.name] || 0;
    });
    return resultObject;
  });
  console.log(resultArray);
  return resultArray;
}

// resultObject example{
// 1: {Coffee Maker: 30, Laptop: 50, Mic: 6, PC: 23, Skirt: 25, Sweater: 10, T-Shirt: 100}
// 2: {Smartphone: 80, Jeans: 70, Bedding Set: 20}
// 3: {Headphones: 40, Dress: 60, Blender: 25}
// }

// resultArray example (when selectedProducts =[Cookware Set, Dress] ) [
//   {day: '1', Cookware Set: 0, Dress: 0},
//  {day: '2', Cookware Set: 0, Dress: 0},
//   {day: '3', Cookware Set: 0, Dress: 60},
// ]
