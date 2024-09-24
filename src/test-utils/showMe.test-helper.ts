// eslint-disable-next-line no-restricted-imports
import { debug } from "vitest-preview";
import "@/mvp.css";
import "@/main.css";
import "@/mvp-theme.css";

// Use this small wrapper to avoid exhaustive auto-completion for the debug command
// of vitest-preview.
// It also imports all relevant css, which is usually not needed.
export function showMe() {
  debug();
}
