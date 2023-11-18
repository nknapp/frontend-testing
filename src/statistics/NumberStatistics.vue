<template>
  <p>Sum: {{ sum }}</p>
  <p>Mean: {{ mean }}</p>
  <p>Median: {{ median }}</p>
</template>
<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  numbers: Array<number>;
}

const props = defineProps<Props>();

const sum = computed(() => {
  let sum = 0;
  for (const value of props.numbers) {
    sum += value;
  }
  return sum;
});

const median = computed(() => {
  return props.numbers[Math.floor(props.numbers.length / 2)];
});

const mean = computed(() => {
  return sum.value / props.numbers.length;
});
</script>
