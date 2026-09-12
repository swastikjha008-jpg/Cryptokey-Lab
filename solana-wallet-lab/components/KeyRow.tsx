"use client";

import { useState } from "react";
import { CopyButton } from "./CopyButton";

export function KeyRow({
  label,
  value,
  maskable = false,
}: {
  label: string;
  value: string;
  maskable?: boolean;
}) {
  const [revealed, setRevealed] = useState(!maskable);
  const display = revealed ? value : "•".repeat(Math.min(value.length, 64));

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wide text-mute">
          {label}
        </span>
        <div className="flex items-center gap-2">
          {maskable && (
            <button
              type="button"
              onClick={() => setRevealed((r) => !r)}
              className="text-xs font-mono text-mute transition-colors hover:text-ink"
            >
              {revealed ? "hide" : "reveal"}
            </button>
          )}
          <CopyButton value={value} />
        </div>
      </div>
      <p className="break-all rounded-lg border border-panel-line bg-black/30 px-3 py-2 font-mono text-sm leading-relaxed text-ink/90">
        {display}
      </p>
    </div>
  );
}
