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

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <div>
        <DatePickComponent filters={filters} onSetDate={handleFilterByDay} />
      </div>
      <div>
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
  );
};

export default Table;
