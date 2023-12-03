/* eslint-disable react/prop-types */
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

export const LineChartComponent = ({ data }) => {
  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="sold" name="Sold" stroke="#8884d8" />
    </LineChart>
  );
};
