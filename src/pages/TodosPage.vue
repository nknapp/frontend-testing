<script setup lang="ts">
import TodoList from "@/components/TodoList.vue";
import NumberStatistics from "@/statistics/NumberStatistics.vue";
import { computed } from "vue";
import { getTodos } from "@/store/todoStore.ts";

const todoCharCount = computed(() =>
  getTodos().value.map((todo) => todo.name.length + todo.description.length),
);
</script>

<template>
  <div>
    <h1>What's up today?</h1>
    <TodoList />
    <h1>Statistics (chars per Todo)</h1>
    <NumberStatistics :numbers="todoCharCount" />
  </div>
</template>
