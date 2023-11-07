"use client";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function GetBalance() {
  async function handler() {
    // localnet, devnet, testnet, mainnet
    const client = new SuiClient({ url: getFullnodeUrl("testnet") });

    const address =
      "0x78687cc53c07484da514ca3d024d06274c9d079def21ece23a553a17397014a6";

    const balance = await client.getBalance({
      owner: address,
    });
    console.log({ balance });
  }
  return (
    <div>
      <button onClick={() => handler()}> Get Balance </button>
      <div>
        <a href="https://github.com/leon-do/sui-next/blob/main/src/app/components/GetBalance.tsx">
          [Source]
        </a>
      </div>
    </div>
  );
}
