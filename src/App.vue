<template>
  <div>
    <nav>
      <ul>
        <li><RouterLink to="/">Todos</RouterLink></li>
        <li><RouterLink to="/visual">Visual Tests</RouterLink></li>
      </ul>
      <ul>
        <li>Test:</li>
        <li><RouterLink to="/test/clipboard">Clipboard</RouterLink></li>
      </ul>
    </nav>
    <RouterView />
  </div>
</template>
<script setup lang="ts"></script>
