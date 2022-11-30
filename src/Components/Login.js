import { React, useState } from 'react';
import { useContext } from 'react';
import { AppState } from '../App';

export default function Login() {
    const App = useContext(AppState);

    const { ethereum } = window;
    const [error, seterror] = useState("")

    const loginwallet = async () => {
        try {
            App.getBal();
            await ethereum.request({ method: "wallet_requestPermissions", params: [{ eth_accounts: {} }] });
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            // App.setLogin(true);
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
                App.setChain("Goerli")
                App.setCurrency("GoerliETH")
                App.setSymbol("rETH")
                App.setLogin(true);
                App.setpaymentContractAdd("0x8bd6Bd652Ac44d74465851291B25dB1DAE15D8fc");
                App.setexploresr("https://goerli.etherscan.io/");
            } else if (chainId == "0x13881") {
                App.setChain("Polygon");
                App.setCurrency("Matic")
                App.setSymbol("Matic")
                App.setLogin(true);
                App.setpaymentContractAdd("0x534cB0d23888Ae9A9DdC1b8a0F2c7269365916ef");
                App.setexploresr("https://mumbai.polygonscan.com/");
            } else {
                seterror("Can only access with Sepolia, Goerli, Polygon Mumbai Network")
                App.setLogin(false);
            }


        } catch (error) {
            seterror(error.message);
        }
    }

    return (
        <div className='min-w-full h-4/5 flex justify-center flex-col items-center'>
            <div className="w-1/3 h-40 mt-4 bg-black bg-opacity-70 p-2 rounded-lg shadow-lg border-opacity-40 border-4 border-black flex flex-col justify-center items-center">
                <h1 className='text-white text-2xl font-medium text-center'>Login</h1>
                {
                    ethereum != undefined ?
                        <div onClick={loginwallet} className='flex border-opacity-60 bg-opacity-90 text-lg font-medium border-2 border-blue-800 cursor-pointer bg-green-800 text-white mt-4 rounded-lg justify-center items-center py-1 px-2'>
                            Connect With Metamask
                        </div>
                        : <div className='flex flex-col justify-center items-center'>
                            <a target={"_blank"} href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">
                                <div className='flex border-opacity-60 bg-opacity-90 text-lg font-medium border-2 border-blue-800 cursor-pointer bg-green-800 text-white mt-4 rounded-lg justify-center items-center py-1 px-2'>
                                    Install Metamask
                                </div>
                            </a>
                            <p className='text-red-600 text-lg mt-2'>Login Required Metamask Extension</p>
                        </div>
                }
                <p className='text-red-600 text-lg mt-2'>{error}</p>
            </div>
        </div>
    )
}
