export function getProfitMargin(revenue, cost) {
  const profit = revenue - cost;
  const profitMargin = (profit / revenue) * 100;
  return profitMargin.toFixed();
}
