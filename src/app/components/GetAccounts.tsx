"use client";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function GetAccounts() {
  async function handler() {
    // popup to connect to wallet
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // popup to allow sui snap on this website
    await window.ethereum.request({
      method: "wallet_requestSnaps",
      params: {
        "npm:@kunalabs-io/sui-metamask-snap": {},
      },
    });

    // get account
    const accounts = await window.ethereum.request({
      method: "wallet_snap",
      params: {
        snapId: "npm:@kunalabs-io/sui-metamask-snap",
        request: {
          method: "getAccounts",
          params: {},
        },
      },
    });
    console.log({ accounts });
  }
  return (
    <div>
      <button onClick={() => handler()}> Get Accounts </button>
      <div>
        <a href="https://github.com/leon-do/sui-next/blob/main/src/app/components/GetAccounts.tsx">
          [Source]
        </a>
      </div>
    </div>
  );
}
