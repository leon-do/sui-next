"use client";
import { TransactionBlock } from "@mysten/sui.js/transactions";

/*
localhost:9680/sui/sendContract

{
  target: "0x5f1cbf91020e986d82493bbb8d0efab99c848d5e5fa1eec71faf2db725e2c5f7",
  args: ["0xa1fc3811720a381e2d55cc620c5514116c5254e2bdc72fda2af341fd0998029a"],
  chain: "testnet" // devnet, testnet, mainnet
}
*/

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

    // https://suiexplorer.com/object/0xa1fc3811720a381e2d55cc620c5514116c5254e2bdc72fda2af341fd0998029a?network=testnet
    const args = [
      "0xa1fc3811720a381e2d55cc620c5514116c5254e2bdc72fda2af341fd0998029a",
    ];

    // create send function: https://docs.sui.io/guides/developer/app-examples/e2e-counter#creating-a-counter
    const txb = new TransactionBlock();
    txb.moveCall({
      arguments: args.map((arg) => txb.object(arg)),
      target: `0x5f1cbf91020e986d82493bbb8d0efab99c848d5e5fa1eec71faf2db725e2c5f7::counter::increment`, // https://suiexplorer.com/object/0x5f1cbf91020e986d82493bbb8d0efab99c848d5e5fa1eec71faf2db725e2c5f7?module=counter&network=testnet
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
    console.log(transaction.digest);
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
