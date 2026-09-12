"use client";

import { KeyRow } from "./KeyRow";

type Accent = "sol" | "eth";

interface ChainCardProps {
  accent: Accent;
  chainLabel: string;
  tagline: string;
  buttonLabel: string;
  generating: boolean;
  onGenerate: () => void;
  publicKey?: string;
  privateKey?: string;
  extra?: { label: string; value: string } | null;
}

const ACCENT_STYLES: Record<
  Accent,
  { ring: string; gradient: string; glow: string; mark: JSX.Element }
> = {
  sol: {
    ring: "border-sol-green/25",
    gradient: "bg-sol-gradient",
    glow: "shadow-[0_0_60px_-15px_rgba(20,241,149,0.35)]",
    mark: (
      <svg viewBox="0 0 40 40" className="h-6 w-6" aria-hidden>
        <defs>
          <linearGradient id="solMark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#9945FF" />
            <stop offset="1" stopColor="#14F195" />
          </linearGradient>
        </defs>
        <line x1="8" y1="30" x2="26" y2="10" stroke="url(#solMark)" strokeWidth="3" strokeLinecap="round" />
        <line x1="14" y1="30" x2="32" y2="10" stroke="url(#solMark)" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        <line x1="20" y1="30" x2="34" y2="14" stroke="url(#solMark)" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  eth: {
    ring: "border-eth-blue/25",
    gradient: "bg-eth-gradient",
    glow: "shadow-[0_0_60px_-15px_rgba(98,126,234,0.35)]",
    mark: (
      <svg viewBox="0 0 40 40" className="h-6 w-6" aria-hidden>
        <defs>
          <linearGradient id="ethMark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8C9EFF" />
            <stop offset="1" stopColor="#627EEA" />
          </linearGradient>
        </defs>
        <polygon
          points="20,6 32,20 20,34 8,20"
          fill="none"
          stroke="url(#ethMark)"
          strokeWidth="2.5"
        />
        <line x1="20" y1="6" x2="20" y2="34" stroke="url(#ethMark)" strokeWidth="1.5" opacity="0.5" />
      </svg>
    ),
  },
};

export function ChainCard({
  accent,
  chainLabel,
  tagline,
  buttonLabel,
  generating,
  onGenerate,
  publicKey,
  privateKey,
  extra,
}: ChainCardProps) {
  const styles = ACCENT_STYLES[accent];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${styles.ring} bg-panel p-6 backdrop-blur-xl ${styles.glow} sm:p-7`}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-panel-line bg-black/40">
          {styles.mark}
        </span>
        <div>
          <h3 className="font-mono text-lg text-ink">{chainLabel}</h3>
          <p className="text-sm text-mute">{tagline}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onGenerate}
        disabled={generating}
        className={`mt-6 w-full rounded-lg px-4 py-2.5 text-sm font-medium text-black transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${styles.gradient}`}
      >
        {generating ? "generating…" : buttonLabel}
      </button>

      {publicKey && privateKey ? (
        <div className="mt-6 space-y-4 border-t border-panel-line pt-5">
          <KeyRow label="public key" value={publicKey} />
          <KeyRow label="private key" value={privateKey} maskable />
          {extra ? <KeyRow label={extra.label} value={extra.value} maskable /> : null}
        </div>
      ) : (
        <p className="mt-6 border-t border-panel-line pt-5 text-sm text-mute">
          No keypair yet — generate one to see it here.
        </p>
      )}
    </div>
  );
}
