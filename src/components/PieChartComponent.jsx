/* eslint-disable react/prop-types */
import { PieChart, Pie, Tooltip } from "recharts";

export const PieChartComponent = ({ data }) => {
  const groupedData = data.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const chartData = Object.entries(groupedData).map(
    ([category, categoryData]) => {
      const totalSold = categoryData.reduce(
        (total, item) => total + item.sold,
        0
      );
      return {
        category,
        totalSold,
      };
    }
  );

  return (
    <PieChart width={400} height={300}>
      <Pie
        dataKey="totalSold"
        nameKey="category"
        data={chartData}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      />
      <Tooltip />
    </PieChart>
  );
};
