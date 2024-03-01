import React, { useContext } from 'react';
import { Bars, TailSpin } from 'react-loader-spinner';
import { AppState } from '../App';

export default function Send() {
  const App = useContext(AppState);

  return (
    <>
      <div className="flex flex-col justify-center items-center text-white ">
        <div className="flex w-4/5 justify-around items-center mt-7 ">
          <div className="flex cursor-pointer justify-center items-center p-3 border-bottom  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-coin"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
            </svg>
            <h1 className="ml-2 text-lg font-medium">{App.currency}</h1>

          </div>
          <div className="flex items-center border-bottom  p-3 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="ml-2 bi bi-wallet2"
              viewBox="0 0 16 16"
            >
              <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
            </svg>
            <h1 className="ml-2 text-lg font-medium">Balance :</h1>
            <h1 className="ml-2 text-lg font-medium">{App.balance.slice(0, 5)}{App.symbol}</h1>
          </div>

          <div className="btn shadow-lg border rounded btn-sm text-light text-center" onClick={() => App.setShowErc(App.showErc ? false : true)}>
            Token
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="20"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
        </div>


        <div className={`${App.showErc ? '' : "hidden"} flex w-4/5 justify-between items-center mt-5`}>
          <div onClick={() => {
            App.setercTokenAdd("0x326C977E6efc84E512bB9C30f76E30c160eD06FB");
          }} className='badge  mr-4  cursor-pointer border ' >
            Use<br /> Default <br /> Address
          </div>
          <br />

          <input onChange={(e) => { App.setercTokenAdd(e.target.value) }} value={App.ercTokenAdd} className="w-3/4 p-3 border  text-dark rounded-lg" placeholder="Enter ERC20 Token Address" />
          {App.ercload ?
            <div className="flex p-2 cursor-pointer justify-around items-center w-1/4 ml-4 bg-blue-800 bg-opacity-70 border-2 border-blue-900 border-opacity-60 text-xl font-medium rounded-lg">
              <TailSpin
                width={28}
                height={28}
                color={"white"}
              />
            </div>
            :
            (App.tokenChanged ?
              <div onClick={App.removeToken} className="flex cursor-pointer justify-around items-center w-1/4 p-2 ml-4 bg-red-600 bg-opacity-70 border-2 border-blue-900 border-opacity-60 text-xl font-medium rounded-lg">
                Remove
              </div>
              :

              <div onClick={App.selectToken} className="flex cursor-pointer justify-around items-center w-1/4 p-2 ml-4 bg-blue-800 bg-opacity-70 border-2 border-blue-900 border-opacity-60 text-xl font-medium rounded-lg">
                Select
              </div>

            )
          }
        </div>

        <div className="flex w-4/5 justify-between items-center mt-5">
          <input onChange={(e) => App.setRecipientAddress(e.target.value)} value={App.recipientAddress} className="w-3/4 p-3 border text-dark outline-none rounded-lg" placeholder="Paste Recipient Address" />
          <input onChange={(e) => App.setAmount(e.target.value)} value={App.amount} type={"number"} className="w-1/4 ml-4 p-3 text-dark rounded-lg" placeholder="Amount" />
        </div>

        {App.txLoading ?
          <div className="flex mt-4 w-4/5 cursor-pointer justify-center items-center p-2 bg-green-700 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg">
            <Bars
              width={30}
              height={46}
              color={'white'}
            />
          </div>
          :
          <div onClick={App.transferAmount} className="bg-blue-800 flex mt-4 w-4/5 cursor-pointer justify-center items-center p-2 border text-xl font-medium rounded-lg "  >
            Transfer
          </div>
        }

        <div className={`${App.showRecentTX ? '' : 'hidden'}   bg-black rounded-lg bg-opacity-60 border-2 border-blue-900 border-opacity-80 w-4/5 mt-2`}>
          <div className="flex w-full items-center justify-center rounded-t-lg">
            <div className="w-4/6 py-2 px-2">
              <p className="text-xl font-mono">Amount:{App.recentTX.amount}{App.recentTX.sym}</p>
              <p className="text-xs font-mono">to:{App.recentTX.to} </p>
            </div>
            {App.saveTxLoad ?
              <div className="flex justify-center bg-green-700 font-medium font-mono bg-opacity-80 h-full w-1/6 py-1 mr-2 rounded-md">
                <TailSpin
                  height={18}
                  width={18}
                  color={'white'}
                />
              </div>
              :
              <button onClick={App.saveTX} className="bg-green-700 font-medium font-mono bg-opacity-80 h-full w-1/6 py-1 mr-2 rounded-md">Save</button>
            }
            <button onClick={() => App.setshowRecentTX(false)} className="bg-red-700 font-medium font-mono bg-opacity-80 h-full w-1/6 py-1 mr-2 rounded-md">Ignore</button>
          </div>
          <a target={'_blank'} href={`${App.exploresr}/tx/${App.recentTX.txhash}`}>
            <div className="font-mono w-full rounded-b-lg bg-gray-900 text-center cursor-pointer text-opacity-30">
              View Transaction
            </div>
          </a>
        </div>

      </div>

      <div>
        <div className={`${App.error ? "" : "hidden"} `}>
          <div id="toast-simple" className="absolute flex items-center max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
            <svg aria-hidden="true" className="w-5 h-5 text-blue-600 dark:text-blue-500" focusable="false" data-prefix="fas" data-icon="paper-plane" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"></path></svg>
            <div className="pl-4 text-sm font-normal">{App.error}</div>
            <div className="btn" onClick={() => {
              App.setError("")
            }}>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </div>
          </div>

        </div>
        <div className={`${App.message ? "" : "hidden"}`}>
          <div id="toast-simple" className="absolute bottom-5 flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
            <svg aria-hidden="true" className="w-5 h-5 text-blue-600 dark:text-blue-500" focusable="false" data-prefix="fas" data-icon="paper-plane" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"></path></svg>
            <div className="pl-4 text-sm font-normal">{App.message}</div>
            <div className="btn" onClick={() => {
              App.setMessage("")
            }}>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
