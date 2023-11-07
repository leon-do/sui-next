import GetBalance from "./components/GetBalance";
import GetAccounts from "./components/GetAccounts";
import SignPersonalMessage from "./components/SignPersonalMessage";
import SignAndExecuteTransactionBlock from "./components/SignAndExecuteTransactionBlock";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <GetBalance />
      <GetAccounts />
      <SignPersonalMessage />
      <SignAndExecuteTransactionBlock />
    </main>
  );
}
