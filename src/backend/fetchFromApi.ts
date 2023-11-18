import { baseApiUrl } from "@/backend/config.ts";

// A small wrapper, because we don't want to add the api-url to all fetch-requests that we do.
// Might also write a wrapper for POST and PUT, with a JSON body.
export function apiGet(path: string) {
  return fetch(new URL(path, baseApiUrl));
}
