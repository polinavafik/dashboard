import { createSlice } from "@reduxjs/toolkit";
import { preparedData } from "../utils/data";

const initialState = {
  tableData: localStorage.getItem("tableData")
    ? JSON.parse(localStorage.getItem("tableData"))
    : preparedData,
  sortRevenue: false,
  sortUnitsSold: false,
  sortProfitMargins: false,
};

const TableDataSlice = createSlice({
  initialState,
  name: "tableData",
  reducers: {
    toggleSortRevenue: state => {
      state.sortRevenue = !state.sortRevenue;
      state.tableData.sort((product1, product2) =>
        state.sortRevenue
          ? product1.revenue - product2.revenue
          : product2.revenue - product1.revenue
      );
    },

    toggleSortUnitsSold: state => {
      state.sortUnitsSold = !state.sortUnitsSold;
      state.tableData.sort((product1, product2) =>
        state.sortUnitsSold
          ? product1.sold - product2.sold
          : product2.sold - product1.sold
      );
    },
  },
});

export const { toggleSortRevenue, toggleSortUnitsSold } =
  TableDataSlice.actions;

export const selectTableData = state => state.tableData.tableData;
export default TableDataSlice.reducer;
