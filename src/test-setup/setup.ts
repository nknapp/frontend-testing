import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import { muteConsoleWarnings } from "./init/mute-console-warnings";
import { fetch } from "cross-fetch";
// Setup mock api for every test
import "@/test-utils/mock-api.test-helper";

vi.mock("@/utils/copyToClipboard");
vi.mock("@/utils/notifyUser");

globalThis.fetch = fetch;

muteConsoleWarnings();
