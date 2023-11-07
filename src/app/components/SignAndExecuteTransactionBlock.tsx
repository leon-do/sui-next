"use client";

import { TransactionBlock } from "@mysten/sui.js/transactions";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function SignAndExecuteTransactionBlock() {
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

    // create transaction block https://sui-typescript-docs.vercel.app/typescript/transaction-building/basics#javascript-values
    const txb = new TransactionBlock();
    const mist = 0.01 * 10 ** 9; // 10**9 mist == 1 SUI
    const [coin] = txb.splitCoins(txb.gas, [mist]);
    const toAddress =
      "0x78687cc53c07484da514ca3d024d06274c9d079def21ece23a553a17397014a7";
    txb.transferObjects([coin], toAddress);

    // send transaction
    const transaction = await window.ethereum.request({
      method: "wallet_snap",
      params: {
        snapId: "npm:@kunalabs-io/sui-metamask-snap",
        request: {
          method: "signAndExecuteTransactionBlock",
          params: {
            transactionBlock: txb.serialize(),
            account: accounts[0],
            chain: "sui:testnet",
          },
        },
      },
    });
    console.log({ transaction });
  }
  return (
    <div>
      <button onClick={() => handler()}>
        Sign and Execute Transaction Block
      </button>
    </div>
  );
}
