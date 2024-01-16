import { useState, createContext, useEffect } from "react";
import Login from "./Components/Login";
import Header from "./Components/Header";
import Main from "./Components/Main";
import { ethers } from "ethers";
import paypal from "./paymentt/paypal.json";
import { ERCABI } from "./paymentt/abi/ERCABI";

const AppState = createContext();

function App() {
  const { ethereum } = window;

  const [login, setLogin] = useState(false);
  const [address, setaddress] = useState("");
  const [chain, setChain] = useState("");

  const [symbol, setSymbol] = useState();
  const [balance, setBalance] = useState();
  const [currency, setCurrency] = useState();

  const [ercTokenAdd, setercTokenAdd] = useState("");

  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");

  const [paymentContractAdd, setpaymentContractAdd] = useState("");
  const [exploresr, setexploresr] = useState();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [tokenChanged, settokenChanged] = useState(false);

  const [showErc, setShowErc] = useState(false);
  const [ercload, setercload] = useState(false);

  const [showRecentTX, setshowRecentTX] = useState(false);
  const [recentTX, setrecentTX] = useState({
    txhash: "",
    from: "",
    to: "",
    amount: "",
    sym: "",
  });
  const [saveTxLoad, setsaveTxLoad] = useState(false);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const ERCContract = new ethers.Contract(ercTokenAdd, ERCABI, signer);
  const paymentContract = new ethers.Contract(
    paymentContractAdd,
    paypal.output.abi,
    signer
  );

  const selectToken = async () => {
    try {
      setercload(true);
      const name = await ERCContract.name();
      const symbol = await ERCContract.symbol();
      const balance = await ERCContract.balanceOf(address);

      setBalance(ethers.utils.formatEther(balance));
      setSymbol(symbol);
      setCurrency(name);
      settokenChanged(true);
      setercload(false);
    } catch (error) {
      setercload(false);
    }
  };

  const removeToken = async () => {
    if (chain === "Sepolia") {
      setCurrency("SepoliaETH");
      setLogin(true);
      setSymbol("rEth");
    } else if (chain === "Goerli") {
      setCurrency("GoerliETH");
      setSymbol("rETH");
      setLogin(true);
    } else if (chain === "Polygon") {
      setCurrency("Matic");
      setLogin(true);
      setSymbol("Matic");
    }

    setercTokenAdd("");
    settokenChanged(false);
    setShowErc(false);
    getBal();
  };

  const transferAmount = async () => {
    setMessage("");

    try {
      if (tokenChanged) {
        const tx = await ERCContract.transfer(
          recipientAddress,
          ethers.utils.parseEther(amount)
        );
        await tx.wait();
        selectToken();

        setrecentTX({
          txhash: tx.hash,
          from: address,
          to: recipientAddress,
          amount: amount,
          sym: symbol,
        });

        setshowRecentTX(true);
      } else {
        const tx = await paymentContract._transfer(recipientAddress, symbol, {
          value: ethers.utils.parseEther(amount),
        });
        await tx.wait();
        getBal();
      }
      setMessage("Transaction Successful");
    } catch (error) {
      setError("Error Occured.");
    }

    setsaveTxLoad(false);
  };

  async function getBal() {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const bal = await signer.getBalance();
    setBalance(ethers.utils.formatEther(bal));
  }

  useEffect(() => {
    ethereum.on("chainChanged", async (chainId) => {
      if (chainId === "0xaa36a7") {
        setChain("Sepolia");
        setCurrency("SepoliaETH");
        setpaymentContractAdd("0x04E10a7A65170Ff32a3B9A4420b47AA4e52BEbC8");
        setSymbol("rEth");
        setexploresr("https://sepolia.etherscan.io/");
      } else if (chainId === "0x5") {
        setChain("Goerli");
        setCurrency("GoerliETH");
        setpaymentContractAdd("0x8bd6Bd652Ac44d74465851291B25dB1DAE15D8fc");
        setSymbol("rETH");
        setexploresr("https://goerli.etherscan.io/");
      } else if (chainId === "0x13881") {
        setChain("Polygon");
        setCurrency("Matic");
        setpaymentContractAdd("0x534cB0d23888Ae9A9DdC1b8a0F2c7269365916ef");
        setSymbol("Matic");
        setexploresr("https://mumbai.polygonscan.com/");
      } else {
        setLogin(false);
      }
      getBal();
      removeToken();
    });

    ethereum.on("accountsChanged", async (accounts) => {
      setaddress(accounts[0]);
      getBal();
    });
  });

  const saveTX = async () => {
    setsaveTxLoad(true);
    try {
      const tx = await paymentContract.saveTX(
        recentTX.from,
        recentTX.to,
        ethers.utils.parseEther(recentTX.amount),
        recentTX.sym
      );

      await tx.wait();

      setMessage("Transaction Saved");
    } catch (error) {
      setError("Failed.");
    }

    setshowRecentTX(false);
    setsaveTxLoad(false);
  };

  return (
    <>
      <AppState.Provider
        value={{
          login,
          setLogin,
          address,
          setaddress,
          chain,
          setChain,
          symbol,
          setSymbol,
          balance,
          setBalance,
          currency,
          setCurrency,
          getBal,
          ercTokenAdd,
          setercTokenAdd,
          amount,
          setAmount,
          recipientAddress,
          setRecipientAddress,
          paymentContractAdd,
          setpaymentContractAdd,
          setexploresr,
          exploresr,
          error,
          setError,
          message,
          setMessage,
          tokenChanged,
          settokenChanged,
          showErc,
          setShowErc,
          ercload,
          setercload,
          selectToken,
          transferAmount,
          removeToken,
          showRecentTX,
          setshowRecentTX,
          recentTX,
          setrecentTX,
          saveTxLoad,
          setsaveTxLoad,
          saveTX,
          paymentContract,
        }}
      >
        <div className="min-w-full h-screen">
          {login ? (
            <div className="d-flex flex-column">
              <div className="">
                <Header />
              </div>
              <div className="">
                <Main />
              </div>
            </div>
          ) : (
            <Login />
          )}
        </div>
      </AppState.Provider>
    </>
  );
}

export default App;
export { AppState };
