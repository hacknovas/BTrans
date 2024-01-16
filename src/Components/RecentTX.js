import { React, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { AppState } from "../App";

export default function RecentTX() {
  const App = useContext(AppState);
  const [data, setData] = useState([]);

  async function getData() {
    const recipients = await App.paymentContract.filters.transaction(
      App.address
    );
    const recipientsData = await App.paymentContract.queryFilter(recipients);
    setData(recipientsData);

    console.log(recipients);

    if (data == []) {
    }
  }

  useEffect(() => {
    getData();
  });
  return (
    <>
      <div className="flex flex-col items-center justify-center p-3 ">
        <div className={`${data == [] ? "" : "hidden"}`}>
          No Any Transaction
        </div>

        {data.map((e, i) => {
          return (
            <div
              className={`border-start rounded-lg text-light  w-4/5 mt-2`}
              key={i}
            >
              <div className="flex w-full items-center justify-center rounded-t-lg">
                <div className="w-full py-2 px-2">
                  <p className="text-xl font-mono">
                    Amount: {ethers.utils.formatEther(e.args.amount)}{" "}
                    {e.args.symb}
                  </p>
                  <p className="text-xs font-mono">to: {e.args._to}</p>
                </div>
              </div>
              <a
                target={"_blank"}
                href={`${App.exploresr}/tx/${e.transactionHash}`}
              >
                <div className="font-mono w-full rounded-b-lg bg-dark text-center cursor-pointer text-light">
                  View Transaction
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}
