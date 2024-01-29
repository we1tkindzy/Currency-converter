export default (value: number): number | string =>
  value < 9 ? `0${value}` : value;
