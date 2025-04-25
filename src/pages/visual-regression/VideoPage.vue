<script setup lang="ts">
import video from "./test-video.mp4";
</script>
<template>
  <video :src="video" autoplay muted width="600" height="auto"></video>
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
