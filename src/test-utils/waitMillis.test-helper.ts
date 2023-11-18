// Sometimes, on rare occasions, it is necessary to wait for a small amount of time in the test
// just to be sure that nothing changes during that time.
// A "Promise.resolve()" might be too fast. A "nextTick" as well.
// And maybe not, but after a refactoring it may be to fast for the new implementation.
// It is a difficult topic.
// The best method would be to wait for something else to happen, but sometimes this is not possible.
export function waitMillis(millis: number) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}
