import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/style.scss";

import App from "components/App/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
