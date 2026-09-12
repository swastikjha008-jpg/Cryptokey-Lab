"use client";

import { useState } from "react";

export function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API can fail in insecure contexts — fail silently,
      // the value is still selectable/visible for manual copy.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="shrink-0 rounded-md border border-panel-line px-2.5 py-1 text-xs font-mono text-mute transition-colors hover:border-ink/30 hover:text-ink"
    >
      {copied ? "copied" : label ?? "copy"}
    </button>
  );
}
