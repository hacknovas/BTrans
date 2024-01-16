import { React, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AppState } from "../App";

export default function Login() {
  const App = useContext(AppState);

  const { ethereum } = window;
  const [getLogin, setGetLogin] = useState(false);

  const [error, seterror] = useState("");

  const loginwallet = async () => {
    try {
      App.getBal();
      await ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      App.setaddress(accounts[0]);

      const chainId = await ethereum.request({ method: "eth_chainId" });
      if (chainId == "0xaa36a7") {
        App.setChain("Sepolia");
        App.setCurrency("SepoliaETH");
        App.setSymbol("rEth");
        App.setLogin(true);
        App.setpaymentContractAdd("0x04E10a7A65170Ff32a3B9A4420b47AA4e52BEbC8");
        App.setexploresr("https://sepolia.etherscan.io/");
      } else if (chainId == "0x5") {
        App.setChain("Goerli");
        App.setCurrency("GoerliETH");
        App.setSymbol("rETH");
        App.setLogin(true);
        App.setpaymentContractAdd("0x8bd6Bd652Ac44d74465851291B25dB1DAE15D8fc");
        App.setexploresr("https://goerli.etherscan.io/");
      } else if (chainId == "0x13881") {
        App.setChain("Polygon");
        App.setCurrency("Matic");
        App.setSymbol("Matic");
        App.setLogin(true);
        App.setpaymentContractAdd("0x534cB0d23888Ae9A9DdC1b8a0F2c7269365916ef");
        App.setexploresr("https://mumbai.polygonscan.com/");
      } else {
        seterror(
          "Can only access with Sepolia, Goerli, Polygon Mumbai Network"
        );
        App.setLogin(false);
      }
    } catch (error) {
      seterror("Error Occured");
    }
  };

  useEffect(() => {
    if (ethereum) {
      setGetLogin(true);
    } else {
      setGetLogin(false);
    }
  }, []);

  return (
    <>
      <div className="min-w-full h-4/5 flex justify-center flex-col items-center ">
        <div className="w-1/3 h-40 mt-4  shadow-lg p-3 mb-5 bg-body-none rounded flex flex-col justify-center items-center">
          <h1 className="badge border-bottom border-top text-white text-2xl mb-3 font-medium text-center">
            Login
          </h1>
          {getLogin ? (
            <div
              onClick={loginwallet}
              className="flex border-bottom text-lg font-medium  cursor-pointer  text-white mt-4 bg-primary rounded-sm justify-center items-center py-1 px-2"
            >
              Connect With Metamask
            </div>
          ) : (
            <div className="">
              <a
                target="_blank"
                href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
              >
                <div className="flex border-opacity-60 bg-opacity-90 text-lg font-medium border-2 border-blue-800 cursor-pointer bg-green-800 text-white mt-4 rounded-lg justify-center items-center py-1 px-2">
                  Install Metamask
                </div>
              </a>
              <p className="text-red-600 text-lg mt-2">
                Login Required Metamask Extension
              </p>
            </div>
          )}
        </div>

        <div className={`${error ? "" : "hidden"} `}>
          <div
            id="toast-simple"
            className="align-bottom bottom-5 flex  max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
            role="alert"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-blue-600 dark:text-blue-500"
              focusable="false"
              data-prefix="fas"
              data-icon="paper-plane"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"
              ></path>
            </svg>
            <div className="pl-4 text-sm font-normal">{error}</div>
            <div
              className="btn btn-sm ml-0"
              onClick={() => {
                seterror("");
              }}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
