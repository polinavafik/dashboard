import "./App.css";
import { TABLE_ATTRIBUTES } from "./utils/constants";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleSortRevenue,
  toggleSortUnitsSold,
  selectTableData,
} from "./app/TableDataSlice";

function App() {
  const dispatch = useDispatch();
  const tableData = useSelector(selectTableData);

  const handleSort = attribute => {
    switch (attribute) {
      case "Revenue":
        dispatch(toggleSortRevenue());
        break;
      case "Units Sold":
        dispatch(toggleSortUnitsSold());
        break;
      default:
        break;
    }
  };

  return (
    <>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            {TABLE_ATTRIBUTES.map(attribute =>
              attribute === "Revenue" ||
              attribute === "Units Sold" ||
              attribute === "Profit Margin" ? (
                <th key={attribute} onClick={() => handleSort(attribute)}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {attribute}
                  </span>
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </th>
              ) : (
                <th key={attribute}>{attribute}</th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {tableData.map(sale => {
            const { id, date, category, name, sold, revenue, cost, margin } =
              sale;

            return (
              <tr key={id}>
                <td>{date}</td>
                <td>{category}</td>
                <td>{name}</td>
                <td>{sold}</td>
                <td>${revenue}</td>
                <td>${cost}</td>
                <td>{margin}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
