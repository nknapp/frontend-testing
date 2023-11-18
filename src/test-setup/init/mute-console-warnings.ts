export function muteConsoleWarnings() {
  // Workaround for vue not throwing errors but only logging [Vue warn] if an error occurs (in tests at least)
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === "string" && args[0].startsWith("[Vue warn]")) {
      throw new Error(args[0]);
    }
    originalConsoleWarn(...args);
  };
}
