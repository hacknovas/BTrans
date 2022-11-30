import React, { useState } from 'react';
import Send from './Send';
import RecentTX from "./RecentTX";
import Recipient from "./Recipient";

export default function Main() {

  const [route, setRoute] = useState('Send');

  return (
    <>
      <div className='w-full mt-12 flex flex-col justify-center items-center'>
        <div className='flex justify-around text-log font-medium items-center bg-gray-900 border-2 border-b-0 text-white border-opacity-50 border-blue-800 rounded-t-lg w-1/2'>
          {/* send */}
          <li onClick={() => setRoute('Send')} className={`list-none cursor-pointer py-2 w-1/4 ${route == 'send' ? "bg-black bg-opacity-60" : "bg-gray-900"} text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}>
            Send
          </li>
          {/* Recipients */}
          <li onClick={() => setRoute('Recipient')} className={`list-none cursor-pointer py-2 w-1/4 ${route == 'recipients' ? "bg-black bg-opacity-60" : "bg-gray-900"} text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}>
            Recipients
          </li>
          {/* Recent Tx */}
          <li onClick={() => setRoute('RecentTX')} className={`list-none cursor-pointer py-2 w-1/4 ${route == 'recent_tx' ? "bg-black bg-opacity-60" : "bg-gray-900"} text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}>
            Recent Tx
          </li>
        </div>
        <div className='bg-black bg-opacity-60 pb-5 overflow-y-auto border-2 border-t-0 shadow-lg border-opacity-50 border-blue-800 rounded-b-lg w-1/2'>
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
