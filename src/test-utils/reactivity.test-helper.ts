import { unref, watch } from "vue";
import { clone } from "ramda";

// In order to test vue reactivity it is helpful to collect
// all changes of a Ref and compare them against the expected
// results
export function gatherDeepUpdates(object: unknown): Array<unknown> {
  const result: unknown[] = [];
  watch(
    () => object,
    (newValue) => {
      result.push(clone(unref(newValue)));
    },
    { deep: true },
  );
  return result;
}
