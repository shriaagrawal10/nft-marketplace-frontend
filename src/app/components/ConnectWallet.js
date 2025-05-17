"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function ConnectWallet() {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.error("User rejected wallet connection", err);
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  useEffect(() => {
    const checkIfWalletConnected = async () => {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      }
    };
    checkIfWalletConnected();
  }, []);

  return (
    <div className="mb-8">
      {walletAddress ? (
        <p className="text-green-600 font-semibold">
          Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </p>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Connect MetaMask
        </button>
      )}
    </div>
  );
}
