<script setup lang="ts">
import { copyToClipboard } from "@/utils/copyToClipboard.js";
</script>
<template>
  <div>
    <h1>Clipboard test page</h1>
    <p>
      This page only exists to simplify the manual test of the clipboard page.
    </p>
    <button @click="copyToClipboard('some text')">Copy 'some text'</button>

    <label for="textInput"> Paste text here </label>
    <textarea onclick="this.value = ''" id="textInput" rows="5" />
  </div>
</template>
