/* eslint-disable react/prop-types */
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { prepareLineChartData } from "../utils/prepareLineChartData";

export const LineChartComponent = ({ data }) => {
  const preparedData = prepareLineChartData(data);

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
