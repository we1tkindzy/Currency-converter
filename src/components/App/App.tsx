import CurrencyConverter from "components/CurrencyConverter/CurrencyConverter";
import { Coin } from "types";

const API_ENDPOINT = "https://api.coinlore.net";

const currencies: Coin[] = [
  {
    id: "80",
    symbol: "ETH",
    name: "Ethereum",
  },
  {
    id: "90",
    symbol: "BTC",
    name: "Bitcoin",
  },
  {
    id: "518",
    symbol: "USDT",
    name: "Tether",
  },
];

const App = () => {
  return (
    <CurrencyConverter apiEndpoint={API_ENDPOINT} currencies={currencies} />
  );
};

export default App;
