import { useSelector, useDispatch } from "react-redux";
import {
  toggleSort,
  setFilter,
  clearFilters,
  selectTableData,
  selectSortOptions,
  selectFilters,
  compareProducts,
} from "./app/TableDataSlice";
import { DatePickComponent } from "../src/components/DatePickComponent";
import SelectComponent from "../src/components/SelectComponent";
import { PieChartComponent } from "../src/components/PieChartComponent";
import { LineChartComponent } from "../src/components/LineChartComponent";

import { Button, Paper } from "@mui/material";
import "./App.css";
import { TableComponent } from "../src/components/TableComponent";
import ProductComparison from "./components/ProductComparison";

function App() {
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

  const handleProductCompare = selectedProducts => {
    dispatch(compareProducts({ products: selectedProducts }));
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

      <TableComponent
        onHandleSort={handleSort}
        sortOptions={sortOptions}
        tableData={tableData}
      />

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
        <LineChartComponent data={tableData} />
        <PieChartComponent data={tableData} />
      </div>

      <div
        style={{
          paddingTop: "30px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <ProductComparison
          tableData={tableData}
          onCompare={handleProductCompare}
        />
      </div>
    </Paper>
  );
}

export default App;
