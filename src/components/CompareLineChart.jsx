/* eslint-disable react/prop-types */
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { prepareCompareLineChartData } from "../utils/prepareCompareLineChartData";
import { useSelector } from "react-redux";
import { selectProductsToCompare } from "../app/TableDataSlice";

export const CompareLineChartComponent = ({ data }) => {
  const productsToCompare = useSelector(selectProductsToCompare);
  const [product1, product2] = productsToCompare;

  const preparedData = prepareCompareLineChartData(data, productsToCompare);

  return (
    <LineChart width={600} height={300} data={preparedData}>
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      {productsToCompare.length && (
        <>
          <Line
            type="monotone"
            dataKey={product1.name}
            name={product1.name}
            stroke="#8884d8"
          />
          <Line
            type="monotone"
            dataKey={product2.name}
            name={product2.name}
            stroke="#1564d8"
          />
        </>
      )}
    </LineChart>
  );
};
