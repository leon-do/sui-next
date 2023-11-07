"use client";

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
    console.log({ accounts });

    // sign message
    const signature = await window.ethereum.request({
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
    console.log({ signature });
  }
  return (
    <main>
      <button onClick={() => handler()}> Sign "Hello" </button>
    </main>
  );
}
