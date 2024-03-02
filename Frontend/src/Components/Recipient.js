import React, { useState, useContext, useEffect } from "react";
import { AppState } from "../App";

export default function Recipient() {
  const App = useContext(AppState);

  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [num, setNum] = useState(0);

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const recipients = await App.paymentContract.filters.recipientD(
        App.address
      );
      const recipientsData = await App.paymentContract.queryFilter(recipients);
      setData(recipientsData);
    }
    return () => {
      getData();
    };
  }, [num]);

  const addRecipient = async () => {
    try {
      const tx = await App.paymentContract.recipients(
        recipientAddress,
        recipientName
      );
      await tx.wait();
      setMessage("Recipient Added");
    } catch (error) {
      setError("Failed...");
    }
    let nextnum = num + 1;
    setNum(nextnum);
  };

  const setRecipient = async (add, name) => {
    App.setRecipientAddress(add);
    setMessage("User Selected");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center py-3 px-4 ">
        <input
          onChange={(e) => setRecipientAddress(e.target.value)}
          value={recipientAddress}
          className="w-3/4 p-3 border rounded-lg"
          placeholder="Paste Recipient Address"
        />
        <input
          onChange={(e) => setRecipientName(e.target.value)}
          value={recipientName}
          className="mt-2 w-3/4 p-3 border rounded-lg"
          placeholder="Paste Recipient Name"
        />

        <div
          onClick={addRecipient}
          className="flex mt-4 w-3/4 bg-primary cursor-pointer justify-center items-center p-2 text-grey border text-xl font-medium rounded-lg"
        >
          Add Recipient
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-4 w-full border-top rounded">
        <div className="badge bg-slate-400 border-bottom rounded-none mb-2">
          Recipients
        </div>
        {data.map((e) => {
          return (
            <div
              onClick={() =>
                setRecipient(e.args.recipientis, e.args.recipientName)
              }
              className={` text-grey cursor-pointer rounded-lg border w-3/4 mt-2`}
            >
              <div className="flex w-full items-center justify-center rounded-t-lg">
                <div className="w-full py-2 px-2">
                  <p className="text-xs font-mono">
                    Name:{e.args.recipientis}{" "}
                  </p>
                  <p className="text-xl font-mono">
                    Address:{e.args.recipientName}{" "}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="pt-4  text-grey" style={{ opacity: "0.5" }}>
          <b>Click on Recipient To Select</b>
        </div>
      </div>

      <div className={`${error ? "" : "hidden"}`}>
        <div
          id="toast-simple"
          className="absolute bottom-5 flex items-center max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
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
            className="btn"
            onClick={() => {
              setError("");
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

      <div className={`${message ? "" : "hidden"}`}>
        <div
          id="toast-simple"
          className="absolute bottom-5 flex items-center  max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
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
          <div className="pl-4 text-sm font-normal">{message}</div>
          <div
            className="btn"
            onClick={() => {
              setMessage("");
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
    </>
  );
}
