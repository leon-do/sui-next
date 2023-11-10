"use client";
import { TransactionBlock } from "@mysten/sui.js/transactions";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function SendContract() {
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

    // create send function: https://docs.sui.io/guides/developer/app-examples/e2e-counter#creating-a-counter
    // https://suiexplorer.com/object/0x5f1cbf91020e986d82493bbb8d0efab99c848d5e5fa1eec71faf2db725e2c5f7?module=counter&network=testnet
    const txb = new TransactionBlock();
    txb.moveCall({
      arguments: [txb.object("0xa1fc3811720a381e2d55cc620c5514116c5254e2bdc72fda2af341fd0998029a")],
      target: `0x5f1cbf91020e986d82493bbb8d0efab99c848d5e5fa1eec71faf2db725e2c5f7::counter::increment`,
    });

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
      <button onClick={() => handler()}> Send Contract </button>
      <div>
        <a href="https://github.com/leon-do/sui-next/blob/main/src/app/components/SendContract.tsx">
          [Source]
        </a>
      </div>
    </div>
  );
}
