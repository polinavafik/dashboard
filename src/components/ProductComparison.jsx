/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Select, MenuItem } from "@mui/material";

import { CompareLineChartComponent } from "./CompareLineChart";

const ProductComparison = ({ tableData, onCompare }) => {
  const [selectedProduct1, setSelectedProduct1] = useState("");
  const [selectedProduct2, setSelectedProduct2] = useState("");

  const handleCompare = () => {
    if (selectedProduct1 && selectedProduct2) {
      onCompare([selectedProduct1, selectedProduct2]);
    }
  };

  return (
    <>
      <div>
        <Select
          sx={{ width: "250px", marginRight: "20px" }}
          value={selectedProduct1}
          onChange={e => setSelectedProduct1(e.target.value)}
        >
          {tableData.map(product => (
            <MenuItem key={product.id} value={product}>
              {product.name}
            </MenuItem>
          ))}
        </Select>

        <Select
          sx={{ width: "250px" }}
          value={selectedProduct2}
          onChange={e => setSelectedProduct2(e.target.value)}
        >
          {tableData.map(product => (
            <MenuItem key={product.id} value={product}>
              {product.name}
            </MenuItem>
          ))}
        </Select>

        <Button onClick={handleCompare}>Compare</Button>
      </div>

      <div>
        <CompareLineChartComponent data={tableData} />
      </div>
    </>
  );
};

export default ProductComparison;
