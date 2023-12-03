import { createSlice } from "@reduxjs/toolkit";
import { preparedData } from "../utils/data";

const initialState = {
  tableData: preparedData,
  sortOptions: {
    revenue: "default",
    sold: "default",
    margin: "default",
  },
};

const TableDataSlice = createSlice({
  initialState,
  name: "tableData",
  reducers: {
    toggleSort: (state, action) => {
      const { column } = action.payload;
      const currentSort = state.sortOptions[column];

      switch (currentSort) {
        case "default":
          state.sortOptions[column] = "asc";
          state.tableData.sort(
            (product1, product2) => product1[column] - product2[column]
          );
          break;

        case "asc":
          state.sortOptions[column] = "desc";
          state.tableData.sort(
            (product1, product2) => product2[column] - product1[column]
          );
          break;

        case "desc":
          state.sortOptions[column] = "default";
          state.tableData = preparedData.slice();
          break;

        default:
          break;
      }
    },
  },
});

export const { toggleSort } = TableDataSlice.actions;

export const selectTableData = state => state.tableData.tableData;
export const selectSortOptions = state => state.tableData.sortOptions;

export default TableDataSlice.reducer;
