/**
 * Retry the function until it succeeds, but with a predefined delay between retries
 * and a predefined number of retries.
 * @param fn
 */
export function retry<T>(fn: () => Promise<T>): Promise<T> {
  // TODO: Implement as an exercise
  return fn();
}
