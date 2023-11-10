"use client";
import {
  getFullnodeUrl,
  SuiClient,
  SuiParsedData,
} from "@mysten/sui.js/client";
import { SuiMoveObject } from "@mysten/sui.js";

export default function CallContract() {
  async function handler() {
    const client = new SuiClient({
      url: getFullnodeUrl("testnet"),
    });

    const response = await client.getObject({
      id: "0xa1fc3811720a381e2d55cc620c5514116c5254e2bdc72fda2af341fd0998029a",
      options: { showContent: true },
    });

    console.log(response);
  }
  return (
    <div>
      <button onClick={() => handler()}> Call Contract </button>
      <div>
        <a href="https://github.com/leon-do/sui-next/blob/main/src/app/components/CallContract.tsx">
          [Source]
        </a>
      </div>
    </div>
  );
}
