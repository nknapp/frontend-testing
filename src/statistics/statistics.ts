export function computeSum(numbers: number[]): number {
  let sum = 0;
  for (const value of numbers) {
    sum += value;
  }
  return sum;
}

export function computeMedian(numbers: number[]): number | null {
  if (numbers.length === 0) return null;
  const sorted = [...numbers].sort();
  if (sorted.length % 2 === 0) {
    const halfIndex = sorted.length / 2;
    return computeMean([sorted[halfIndex - 1], sorted[halfIndex]]);
  }
  return sorted[(sorted.length - 1) / 2];
}

export function computeMean(numbers: number[]): number {
  return computeSum(numbers) / numbers.length;
}
