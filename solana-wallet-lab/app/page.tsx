import { AsciiArt } from "@/components/AsciiArt";
import { WalletLab } from "@/components/WalletLab";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <AsciiArt className="absolute inset-0 h-full w-full opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/30 via-void/50 to-void" />

        <div className="relative z-10 max-w-2xl">
          <p className="mb-5 font-mono text-sm text-mute">
            a Web3 keygen playground
          </p>
          <h1 className="text-balance font-mono text-4xl leading-tight text-ink sm:text-6xl">
            Solana-Wallet-lab
          </h1>
          <p className="mx-auto mt-5 max-w-md text-balance text-base leading-relaxed text-mute sm:text-lg">
            Generate real Solana and Ethereum keypairs, entirely in your
            browser. See exactly what a wallet is made of — no server, no
            tracking, nothing saved.
          </p>
          <a
            href="#lab"
            className="mt-9 inline-flex items-center gap-2 rounded-full border border-panel-line bg-panel px-5 py-2.5 text-sm text-ink backdrop-blur-xl transition-colors hover:border-ink/30"
          >
            Open the lab
            <span aria-hidden>↓</span>
          </a>
        </div>
      </section>

      {/* Lab */}
      <section id="lab" className="relative bg-void pt-16">
        <div className="mx-auto mb-10 max-w-5xl px-6 text-center">
          <h2 className="font-mono text-2xl text-ink sm:text-3xl">
            Generate a keypair
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-mute">
            Pick a chain below. Each click runs the actual signing-library
            code that real wallets use.
          </p>
        </div>
        <WalletLab />
      </section>

      <footer className="border-t border-panel-line px-6 py-8 text-center text-xs text-mute">
        Built for learning Web3 fundamentals — Solana-Wallet-lab.
      </footer>
    </main>
  );
}
