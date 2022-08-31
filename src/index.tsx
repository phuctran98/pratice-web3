import ReactDOM from "react-dom";
import App from "./App";
import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";
import "katex/dist/katex.min.css";
import "./styles/index.scss";
import "./index.scss"

const getLibrary = (provider: any, _connector: any) => new Web3(provider);

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <App />
  </Web3ReactProvider>,
  document.getElementById("root")
);
