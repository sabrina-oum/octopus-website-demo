import type { CSSProperties } from "react";

/** Sets `--backdrop`, read by the `bg-(--backdrop)`, `from-(--backdrop)` and `fade-backdrop` classes. */
export function backdropStyle(
  color: string,
): CSSProperties & { "--backdrop": string } {
  return { "--backdrop": color };
}
