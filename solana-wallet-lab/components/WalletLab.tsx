"use client";

import { useState } from "react";
import { ChainCard } from "./ChainCard";
import { CopyButton } from "./CopyButton";
import { generateSolanaKeypair } from "@/lib/solana";
import { generateEthereumWallet } from "@/lib/ethereum";

type HistoryEntry = {
  id: string;
  chain: "Solana" | "Ethereum";
  publicKey: string;
  createdAt: number;
};

export function WalletLab() {
  const [solKey, setSolKey] = useState<{ publicKey: string; privateKey: string } | null>(null);
  const [ethKey, setEthKey] = useState<{ publicKey: string; privateKey: string; mnemonic: string | null } | null>(null);
  const [generatingSol, setGeneratingSol] = useState(false);
  const [generatingEth, setGeneratingEth] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  function addToHistory(chain: HistoryEntry["chain"], publicKey: string) {
    setHistory((prev) => [
      { id: crypto.randomUUID(), chain, publicKey, createdAt: Date.now() },
      ...prev,
    ].slice(0, 12));
  }

  function handleGenerateSolana() {
    setGeneratingSol(true);
    setTimeout(() => {
      const key = generateSolanaKeypair();
      setSolKey({ publicKey: key.publicKey, privateKey: key.privateKey });
      addToHistory("Solana", key.publicKey);
      setGeneratingSol(false);
    }, 280);
  }

  function handleGenerateEthereum() {
    setGeneratingEth(true);
    setTimeout(() => {
      const wallet = generateEthereumWallet();
      setEthKey({
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic,
      });
      addToHistory("Ethereum", wallet.publicKey);
      setGeneratingEth(false);
    }, 280);
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-24">
      {/* Warning banner */}
      <div className="mb-8 flex items-start gap-3 rounded-xl border border-signal/25 bg-signal/[0.06] px-4 py-3 text-sm text-signal">
        <span className="mt-0.5 font-mono">!</span>
        <p className="leading-relaxed">
          Keys are generated locally in your browser and never leave this page. This is a learning
          tool — never send real funds to a key generated here, and never paste a real seed phrase
          into any website.
        </p>
      </div>

      {/* Generator grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <ChainCard
          accent="sol"
          chainLabel="Solana"
          tagline="Ed25519 keypair"
          buttonLabel="Generate keypair"
          generating={generatingSol}
          onGenerate={handleGenerateSolana}
          publicKey={solKey?.publicKey}
          privateKey={solKey?.privateKey}
        />
        <ChainCard
          accent="eth"
          chainLabel="Ethereum"
          tagline="secp256k1 keypair"
          buttonLabel="Generate wallet"
          generating={generatingEth}
          onGenerate={handleGenerateEthereum}
          publicKey={ethKey?.publicKey}
          privateKey={ethKey?.privateKey}
          extra={ethKey?.mnemonic ? { label: "mnemonic", value: ethKey.mnemonic } : null}
        />
      </div>

      {/* Session history */}
      {history.length > 0 && (
        <div className="mt-10 rounded-2xl border border-panel-line bg-panel p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-mono text-sm text-mute">session log</h3>
            <button
              type="button"
              onClick={() => setHistory([])}
              className="text-xs font-mono text-mute transition-colors hover:text-ink"
            >
              clear
            </button>
          </div>
          <ul className="space-y-2">
            {history.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-panel-line bg-black/20 px-3 py-2"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-mono ${
                      entry.chain === "Solana"
                        ? "bg-sol-green/15 text-sol-green"
                        : "bg-eth-blue/15 text-eth-light"
                    }`}
                  >
                    {entry.chain}
                  </span>
                  <span className="truncate font-mono text-xs text-mute">
                    {entry.publicKey}
                  </span>
                </div>
                <CopyButton value={entry.publicKey} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
