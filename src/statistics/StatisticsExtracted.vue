<template>
  <p>Sum: {{ sum }}</p>
  <p>Mean: {{ mean }}</p>
  <p>Median: {{ median }}</p>
</template>
<script lang="ts" setup>
import { toRef } from "vue";
import { useStatistics } from "@/statistics/useStatistics.ts";

interface Props {
  numbers: Array<number>;
}

const props = defineProps<Props>();

const { sum, median, mean } = useStatistics(toRef(props, "numbers"));
</script>
