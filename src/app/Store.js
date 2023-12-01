import { configureStore } from "@reduxjs/toolkit";
import TableDataSlice from "./TableDataSlice";

const Store = configureStore({
  reducer: {
    tableData: TableDataSlice,
  },
});

export default Store;
