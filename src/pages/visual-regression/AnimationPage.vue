<script setup lang="ts"></script>
<template>
  <div data-testid="animation-container">
    <div class="animation">This is animated!</div>
  </div>
</template>
<style>
.animation {
  background-color: var(--color-link);
  padding: 0.25rem;
  color: white;
  text-wrap: nowrap;
  width: 100%;
  animation: 5s expand linear;
}

@keyframes expand {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
