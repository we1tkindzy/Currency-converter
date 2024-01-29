import { Coin } from "types";

export default (currencies: Coin[], symbol: string): Coin => {
  return currencies.filter((currency) => currency.symbol === symbol)[0];
};
