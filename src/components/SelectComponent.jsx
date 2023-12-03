/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { styled } from "@mui/system";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import { grey } from "@mui/material/colors";
import { categories } from "../utils/constants";

const StyledSelect = styled(MuiSelect)`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 200px;
  padding: 0 12px;
  border-radius: 3px;
  text-align: left;
  line-height: 1.5;
  background: #fff;
  border: 1px solid ${grey[200]};
  color: ${grey[900]};
  position: relative;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${grey[50]};
    border-color: ${grey[300]};
  }

  &.Mui-focused {
    outline: 0;
    border-color: ${grey[300]};
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
`;

export default function SelectComponent({ filters, onSetCategory }) {
  const { category } = filters;

  return (
    <FormControl>
      <InputLabel id="categories-label">Category</InputLabel>
      <StyledSelect
        labelId="categories-label"
        id="categories"
        value={category}
        onChange={onSetCategory}
        label="Category"
        startAdornment={<UnfoldMoreRoundedIcon />}
      >
        {categories.map(category => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
}
