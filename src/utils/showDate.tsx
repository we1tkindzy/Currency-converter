import dateFormatter from "utils/dateFormatter";
import { DateFormattedData } from "types";

export default (): DateFormattedData => {
  const date = new Date();
  const day = dateFormatter(date.getDate());
  const month = dateFormatter(date.getMonth() + 1);
  const year = date.getFullYear();
  const hour = dateFormatter(date.getHours());
  const minute = dateFormatter(date.getMinutes());
  const second = dateFormatter(date.getSeconds());

  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
  };
};
