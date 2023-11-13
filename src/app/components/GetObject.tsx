"use client";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";

/*
localhost:9680/sui/getObject

{
  id: "0xa1fc3811720a381e2d55cc620c5514116c5254e2bdc72fda2af341fd0998029a",
  chain: "testnet", // devnet, testnet, mainnet
}
*/

export default function GetObject() {
  async function handler() {
    const client = new SuiClient({
      url: getFullnodeUrl("testnet"),
    });

    const response = await client.getObject({
      id: "0xa1fc3811720a381e2d55cc620c5514116c5254e2bdc72fda2af341fd0998029a",
      options: { showContent: true },
    });

    console.log(response?.data?.content);
  }
  return (
    <div>
      <button onClick={() => handler()}> Get Object </button>
      <div>
        <a href="https://github.com/leon-do/sui-next/blob/main/src/app/components/GetObject.tsx">
          [Source]
        </a>
      </div>
    </div>
  );
}
