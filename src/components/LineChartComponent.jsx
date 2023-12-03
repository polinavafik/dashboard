/* eslint-disable react/prop-types */
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

export const LineChartComponent = ({ data }) => {
  function prepareData(inputData) {
    const preparedData = {};

    inputData.forEach(item => {
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

    const resultArray = Object.entries(preparedData).map(
      ([day, categories]) => {
        const resultObject = { day: parseInt(day) };
        Object.entries(categories).forEach(([category, totalSold]) => {
          resultObject[category] = totalSold;
        });

        return resultObject;
      }
    );

    return resultArray;
  }

  const preparedData = prepareData(data);
  console.log(preparedData);

  return (
    <LineChart width={600} height={300} data={preparedData}>
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Electronics"
        name="Electronics"
        stroke="#8884d8"
      />
      <Line
        type="monotone"
        dataKey="Clothing"
        name="Clothing"
        stroke="#8644d8"
      />
      <Line
        type="monotone"
        dataKey="Home Goods"
        name="Home goods"
        stroke="#1564d8"
      />
    </LineChart>
  );
};
