/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const DatePickComponent = ({ filters, onSetDate }) => {
  const { day } = filters;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Pick a date"
        value={day}
        onChange={newValue => {
          onSetDate(dayjs(newValue).format("YYYY-MM-DD"));
        }}
      />
    </LocalizationProvider>
  );
};
