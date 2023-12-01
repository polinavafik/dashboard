import { createSlice } from "@reduxjs/toolkit";
import { preparedData } from "../utils/data";

const initialState = {
  tableData: preparedData,
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

    toggleSortProfitMargins: state => {
      state.sortProfitMargins = !state.sortProfitMargins;
      state.tableData.sort((product1, product2) =>
        state.sortProfitMargins
          ? product1.margin - product2.margin
          : product2.margin - product1.margin
      );
    },
  },
});

export const {
  toggleSortRevenue,
  toggleSortUnitsSold,
  toggleSortProfitMargins,
} = TableDataSlice.actions;

export const selectTableData = state => state.tableData.tableData;

export default TableDataSlice.reducer;
