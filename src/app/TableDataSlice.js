import { createSlice } from "@reduxjs/toolkit";
import { preparedData } from "../utils/data";

const initialState = {
  originData: preparedData,
  tableData: preparedData,
  sortOptions: {
    revenue: "default",
    sold: "default",
    margin: "default",
  },
  filters: {
    day: null,
    category: "All",
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
          if (state.filters.day !== null || state.filters.category !== "All") {
            state.tableData = state.tableData.slice();
          } else {
            state.tableData = state.originData.slice();
          }
          state.sortOptions[column] = "default";

          // old BUG🐞 returns everything on default because of current logic
          // new BUG🐞 I cannot recieve default unsorted tabledata, because its modified
          break;

        default:
          break;
      }
    },

    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.filters[filterType] = value;

      state.tableData = state.originData.filter(product => {
        if (state.filters.day !== null && state.filters.day !== product.date) {
          return false;
        }

        if (
          state.filters.category !== "All" &&
          state.filters.category !== product.category
        ) {
          return false;
        }

        return true;
      });
    },

    clearFilters: state => {
      state.filters = {
        day: null,
        category: "All",
      };

      //idk maybe clear all filtration and sorting??
      (state.sortOptions = {
        revenue: "default",
        sold: "default",
        margin: "default",
      }),
        (state.tableData = state.originData.slice());
    },
  },
});

export const { toggleSort, setFilter, clearFilters } = TableDataSlice.actions;

export const selectTableData = state => state.tableData.tableData;
export const selectSortOptions = state => state.tableData.sortOptions;
export const selectFilters = state => state.tableData.filters;

export default TableDataSlice.reducer;
