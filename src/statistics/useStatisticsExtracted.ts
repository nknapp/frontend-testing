import { computed, Ref } from "vue";
import { computeMean, computeMedian, computeSum } from "./statistics";

interface UseStatisticsReturn {
  sum: Ref<number>;
  mean: Ref<number>;
  median: Ref<number | null>;
}

export function useStatistics(numbers: Ref<number[]>): UseStatisticsReturn {
  const sum = computed(() => computeSum(numbers.value));
  const median = computed(() => computeMedian(numbers.value));
  const mean = computed(() => computeMean(numbers.value));
  return { sum, mean, median };
}
