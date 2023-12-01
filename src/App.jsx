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

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import * as React from "react";

import "./App.css";
import { columns } from "./utils/constants";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleSortRevenue,
  toggleSortUnitsSold,
  toggleSortProfitMargins,
  selectTableData,
} from "./app/TableDataSlice";

function App() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column =>
                  column.id === "sold" ||
                  column.id === "revenue" ||
                  column.id === "margin" ? (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      onClick={() => handleSort(column.label)}
                    >
                      {column.label}

                      <span className="icon">
                        <i className="fas fa-sort" />
                      </span>
                    </TableCell>
                  ) : (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {tableData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(product => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={product.id}
                    >
                      {columns.map(column => {
                        const value = product[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* <table>
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
      </table> */}
    </>
  );
}

export default App;
