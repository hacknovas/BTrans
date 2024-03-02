import { React, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AppState } from "../App";

export default function Login() {
  const App = useContext(AppState);

  const { ethereum } = window;
  const [MetamaskConnect, setMetamaskConnect] = useState("Connect Metamask");
  const [getLogin, setGetLogin] = useState(false);

  const [error, seterror] = useState("");
  const [installMetamask, setinstallMetamask] = useState(false);

  const loginwallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("Ethereum Not Found");
      }

      setMetamaskConnect("Connecting...");
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
      setMetamaskConnect("Login Metamask");
    } catch (error) {
      seterror(error.message);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      setGetLogin(true);
      setinstallMetamask(true);
    } else {
      setGetLogin(false);
    }
  }, []);

  return (
    <>
      <div className="text-center p-20">
        <div className="d-flex flex-col justify-center items-center">
          <b>BTrans</b>

          <img
            src="./Images/logo1.png"
            alt="NA"
            style={{ filter: "invert(1)", width: "10vh" }}
          />
        </div>
      </div>
      <div className="d-flex flex-wrap justify-center items-center h-50 text-center">
        <div style={{ width: "min-content" }}>
          <img
            src="./Images/metamask.png"
            className="hover:scale-90 "
            width={100}
          ></img>
          <div className="cursor-pointer ">
            <b
              onClick={() => {
                loginwallet();
              }}
            >
              {!getLogin ? (
                <a
                  href="https://metamask.io/download/"
                  style={{ textDecoration: "none" }}
                  target="_blank"
                >
                  Install Metamask
                </a>
              ) : (
                <>{MetamaskConnect}</>
              )}
            </b>
          </div>
        </div>
      </div>
    </>
  );
}
