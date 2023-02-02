import React, { useState } from 'react';
import Send from './Send';
import RecentTX from "./RecentTX";
import Recipient from "./Recipient";

export default function Main() {

  const [route, setRoute] = useState('Send');

  return (
    <>
      <div className='w-full mt-12 flex flex-col justify-center items-center ' >
        <div className='flex justify-around text-log font-medium items-center border-top text-white rounded-t-lg w-1/2'>
          <li onClick={() => setRoute('Send')} className={`rounded-lg border-bottom list-none cursor-pointer py-2 w-1/4 ${route == 'send' ? "" : ""} text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}>
            Send
          </li>
          <li onClick={() => setRoute('Recipient')} className={`rounded-lg border-bottom list-none cursor-pointer py-2 w-1/4 ${route == 'recipients' ? "" : ""} text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}>
            Recipients
          </li>
          <li onClick={() => setRoute('RecentTX')} className={`rounded-lg border-bottom list-none cursor-pointer py-2 w-1/4 ${route == 'recent_tx' ? "" : ""} text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}>
            Recent Txn
          </li>
        </div>
        <div className='shadow-lg p-3 mb-5 rounded pb-5 overflow-y-auto  rounded-b-lg w-1/2  border-bottom'>
          {(() => {
            if (route == 'Send') {
              return <Send />
            } else if (route == 'Recipient') {
              return <Recipient />
            } else if (route == 'RecentTX') {
              return <RecentTX />
            }
          })()}
        </div>

      </div>
    </>
  )
}
