import { retry } from "./retry.ts";

export async function incorrect() {
    const { largeModule } = await import("./large-module");
    return largeModule();
}

export async function correct() {
  const { largeModule } = await retry(() => import("./large-module"));
  return largeModule();
}
