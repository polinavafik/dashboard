import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@mui/material";
import { columns } from "../utils/constants";
import {
  toggleSort,
  setFilter,
  clearFilters,
  selectTableData,
  selectSortOptions,
  selectFilters,
} from "../app/TableDataSlice";
import { DatePickComponent } from "./DatePickComponent";
import SelectComponent from "./SelectComponent";
import { CSVLink } from "react-csv";

export const TableComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const dispatch = useDispatch();
  const tableData = useSelector(selectTableData);
  const sortOptions = useSelector(selectSortOptions);
  const filters = useSelector(selectFilters);

  const handleSort = column => {
    dispatch(toggleSort({ column }));
  };

  const handleFilterByDay = date => {
    dispatch(setFilter({ filterType: "day", value: date }));
  };

  const handleFilterByCategory = event => {
    const newCategory = event.target.value;
    dispatch(setFilter({ filterType: "category", value: newCategory }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: "20px 10px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
          minWidth: "700px",
        }}
      >
        <DatePickComponent filters={filters} onSetDate={handleFilterByDay} />
        <SelectComponent
          filters={filters}
          onSetCategory={handleFilterByCategory}
        />
        <Button onClick={handleClearFilters}>Clear Filters</Button>
      </div>

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  onClick={() => handleSort(column.id)}
                >
                  {column.label}

                  <span className="icon">
                    {" "}
                    <i
                      className={cn("fas", {
                        "fa-sort": sortOptions[column.id] === "default",
                        "fa-sort-up": sortOptions[column.id] === "asc",
                        "fa-sort-down": sortOptions[column.id] === "desc",
                      })}
                    />
                  </span>
                </TableCell>
              ))}
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
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <div
        style={{
          paddingTop: "15px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Button>
          <CSVLink
            style={{
              color: "green",
            }}
            data={tableData}
          >
            Download .csv
          </CSVLink>
        </Button>

        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Paper>
  );
};

export default Table;
