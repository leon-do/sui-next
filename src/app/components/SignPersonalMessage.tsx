"use client";

/*
localhost:9680/sui/signPersonalMessage

{
  message: "hello"
}
*/

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function SignPersonalMessage() {
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

    // sign message
    const signed = await window.ethereum.request({
      method: "wallet_snap",
      params: {
        snapId: "npm:@kunalabs-io/sui-metamask-snap",
        request: {
          method: "signPersonalMessage",
          params: {
            message: "hello",
            account: accounts[0],
          },
        },
      },
    });
    console.log(signed.signature);
  }
  return (
    <main>
      <button onClick={() => handler()}> Sign Hello </button>
      <div>
        <a href="https://github.com/leon-do/sui-next/blob/main/src/app/components/SignPersonalMessage.tsx">
          [Source]
        </a>
      </div>
    </main>
  );
}
