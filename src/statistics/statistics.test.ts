import { describe, expect, it } from "vitest";
import { computeMedian, computeSum } from "@/statistics/statistics.ts";

describe("statistics", () => {
  describe("sum", () => {
    it("is 0 for an empty array", () => {
      expect(computeSum([])).toEqual(0);
    });
    it("equals a single number", () => {
      expect(computeSum([2])).toEqual(2);
    });
    it("computes the sum of multiple numbers", () => {
      expect(computeSum([1, 2, 5, 6])).toEqual(14);
    });
  });

  describe("computeMedian", () => {
    it("returns null for an empty array", () => {
      expect(computeMedian([])).toBeNull();
    });

    it("returns the single element of an array with one element", () => {
      expect(computeMedian([15])).toBe(15);
    });

    it("returns the mean of two elements ", () => {
      expect(computeMedian([14, 16])).toBe(15);
    });

    it("returns middle of an odd number elements ", () => {
      expect(computeMedian([14, 16, 20])).toBe(16);
    });

    it("returns middle of five elements ", () => {
      expect(computeMedian([14, 15, 16, 17, 20])).toBe(16);
    });

    it("returns the mean the middle two of an even number of elements", () => {
      expect(computeMedian([14, 16, 20, 30])).toBe(18);
    });

    it("sorts entries before finding the median", () => {
      expect(computeMedian([30, 14, 16, 20])).toBe(18);
    });
  });
});
