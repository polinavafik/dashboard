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
import { TableComponent } from "./components/TableComponent";

function App() {
  return (
    <>
      <TableComponent />
    </>
  );
}

export default App;
