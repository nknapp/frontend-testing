<script setup lang="ts">
import TodoItem from "@/components/TodoItem.vue";
import { addNewTodo, getTodos, updateTodo } from "@/store/todoStore.ts";

const todos = getTodos();
</script>
<template>
  <div>
    <button @click="addNewTodo()">Add new todo</button>
    <div style="display: grid; gap: 1rem">
      <TodoItem
        :key="todo.id"
        v-for="todo in todos"
        :model-value="todo"
        @update:modelValue="updateTodo($event)"
      />
    </div>
  </div>
</template>
