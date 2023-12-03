export const columns = [
  { id: "date", label: "Date", minWidth: 120, align: "center" },
  { id: "category", label: "Category", minWidth: 120, align: "center" },
  { id: "name", label: "Product", minWidth: 120, align: "center" },
  { id: "sold", label: "Units Sold", minWidth: 120, align: "center" },
  {
    id: "cost",
    label: "Cost",
    minWidth: 120,
    align: "center",
    format: value => `$${value.toLocaleString()}`,
  },
  {
    id: "revenue",
    label: "Revenue",
    minWidth: 120,
    align: "center",
    format: value => `$${value.toLocaleString()}`,
  },
  {
    id: "margin",
    label: "Profit Margin",
    minWidth: 120,
    align: "center",
    format: value => `${value}%`,
  },
];
