import { Wallet } from "ethers";

export interface GeneratedKey {
  chain: "ethereum";
  publicKey: string; // the address
  privateKey: string;
  mnemonic: string | null;
  createdAt: number;
}

/** Generates a brand-new random Ethereum wallet. Runs entirely client-side. */
export function generateEthereumWallet(): GeneratedKey {
  const wallet = Wallet.createRandom();

  return {
    chain: "ethereum",
    publicKey: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic?.phrase ?? null,
    createdAt: Date.now(),
  };
}
