import React from "react";
import { useContext, useState } from "react";
import { AppState } from "../App";

export default function Header() {
  const { ethereum } = window;

  const App = useContext(AppState);
  const [showChains, setShowChains] = useState(false);

  const changeToSepolia = async () => {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xaa36a7" }],
    });
    App.setChain("Sepolia");
    setShowChains(false);
  };

  const changeToPolygon = async () => {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x13881" }],
    });
    App.setChain("Polygon");
    setShowChains(false);
  };

  const changeToGoerile = async () => {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x5" }],
    });
    App.setChain("Goerli");
    setShowChains(false);
  };

  return (
    <>
      <ul className="navbar justify-content-between shadow p-3 mb-5 rounded">
        <li className="nav-item">
          <img
            src="./Images/logo1.png"
            alt="NA"
            style={{ height: "7vh", marginLeft: "2vh", filter: "invert(1)" }}
          />
        </li>

        <li className="nav-item btn d-flex flex-row bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="col-2 bi bi-wallet2"
            viewBox="0 0 16 16"
          >
            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
          </svg>
          <div className="col-10 ">
            {App.address.slice(0, 8)}...{App.address.slice(38)}
          </div>
        </li>

        <li className="nav-item">
          <div
            onClick={() => setShowChains(true)}
            className="btn btn-sm shadow   rounded p-2  py-2 px-4 mr-2 font-sans font-medium cursor-pointer  text-grey "
          >
            Switch
          </div>
        </li>
      </ul>

      <div className={`${showChains ? "" : "hidden"} absolute top-20 right-0`}>
        <div
          onClick={changeToSepolia}
          className="border-bottom text-xl py-2 px-4 mr-2 font-sans  font-medium cursor-pointer text-grey rounded-lg flex justify-between items-center"
        >
          Sepolia
        </div>

        <div
          onClick={changeToPolygon}
          className="border-bottom text-xl py-2 px-4 mr-2 font-sans  font-medium cursor-pointer text-grey rounded-lg flex justify-between items-center"
        >
          Polygon
        </div>

        <div
          onClick={changeToGoerile}
          className="border-bottom text-xl py-2 px-4 mr-2 font-sans  font-medium cursor-pointer text-grey rounded-lg flex justify-between items-center"
        >
          Goerile
        </div>

        <div
          onClick={() => setShowChains(false)}
          className="mt-2 text-xl py-1 px-4 mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium cursor-pointer bg-red-600 text-grey rounded-lg flex justify-center items-center"
        >
          Close
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="ml-2 bi bi-x-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </div>
      </div>
    </>
  );
}
