/* eslint-disable react/prop-types */
import { useState } from "react";
import cn from "classnames";
import {
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
import { CSVLink } from "react-csv";

export const TableComponent = ({ onHandleSort, sortOptions, tableData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  onClick={() => onHandleSort(column.id)}
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
    </>
  );
};

export default Table;
