"use client";
import ConnectWallet from "./components/ConnectWallet";
import MintForm from "./components/MintForm";


export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Decentralized Certificate Issuance
      </h1>

      <div className="flex justify-center mb-6">
        <ConnectWallet />
      </div>

      <div className="mb-6">
        <MintForm />
      </div>
    </main>
  );
}
