import { Keypair } from "@solana/web3.js";

export interface GeneratedKey {
  chain: "solana";
  publicKey: string;
  privateKey: string; // base58-encoded secret key
  createdAt: number;
}

/** Generates a brand-new random Solana keypair. Runs entirely client-side. */
export function generateSolanaKeypair(): GeneratedKey {
  const keypair = Keypair.generate();

  return {
    chain: "solana",
    publicKey: keypair.publicKey.toBase58(),
    privateKey: bytesToBase58(keypair.secretKey),
    createdAt: Date.now(),
  };
}

// Minimal base58 encoder so we don't pull in an extra dependency
// just for display formatting (bs58 is already a transitive dep
// of @solana/web3.js, but we keep this explicit and dependency-free).
const ALPHABET =
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

function bytesToBase58(bytes: Uint8Array): string {
  let digits = [0];

  for (let i = 0; i < bytes.length; i++) {
    let carry = bytes[i];
    for (let j = 0; j < digits.length; j++) {
      carry += digits[j] << 8;
      digits[j] = carry % 58;
      carry = (carry / 58) | 0;
    }
    while (carry > 0) {
      digits.push(carry % 58);
      carry = (carry / 58) | 0;
    }
  }

  // Leading zero bytes map to leading '1's
  for (let k = 0; k < bytes.length && bytes[k] === 0; k++) {
    digits.push(0);
  }

  return digits
    .reverse()
    .map((d) => ALPHABET[d])
    .join("");
}
