// 1. Table:
// + Populate the table with mock sales data for at least three product categories
// over a period of 1 month.
// + Implement sorting options for revenue, units sold, and profit margins.
// - Enable dynamic filtering by day or product category.
// - Add possibility to download data in .csv format
// 2. Chart:
// - Generate a line chart illustrating the sales trend for the month period.
// - Create a pie or bar chart depicting the distribution of sales among the three
// product categories.
// 3. Comparison Feature:
// - Develop a dropdown menu or interactive element to select and compare sales
// data between two specific products.
// - Display the comparative metrics in chart sections for easy analysis.

import "./App.css";
import { TABLE_ATTRIBUTES } from "./utils/constants";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleSortRevenue,
  toggleSortUnitsSold,
  toggleSortProfitMargins,
  selectTableData,
} from "./app/TableDataSlice";

function App() {
  const dispatch = useDispatch();
  const tableData = useSelector(selectTableData);

  const handleSort = attribute => {
    switch (attribute) {
      case "Revenue":
        dispatch(toggleSortRevenue());
        break;

      case "Units Sold":
        dispatch(toggleSortUnitsSold());
        break;

      case "Profit Margin":
        dispatch(toggleSortProfitMargins());
        break;
      default:
        break;
    }
  };

  return (
    <>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            {TABLE_ATTRIBUTES.map(attribute =>
              attribute === "Revenue" ||
              attribute === "Units Sold" ||
              attribute === "Profit Margin" ? (
                <th key={attribute} onClick={() => handleSort(attribute)}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {attribute}
                  </span>
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </th>
              ) : (
                <th key={attribute}>{attribute}</th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {tableData.map(sale => {
            const { id, date, category, name, sold, revenue, cost, margin } =
              sale;

            return (
              <tr key={id}>
                <td>{date}</td>
                <td>{category}</td>
                <td>{name}</td>
                <td>{sold}</td>
                <td>${revenue}</td>
                <td>${cost}</td>
                <td>{margin}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
