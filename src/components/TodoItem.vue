<script lang="ts" setup>
import { ref, watch } from "vue";
import { Todo } from "@/model/todo.ts";
import TextField from "@/components/TextField.vue";
import { copyToClipboard } from "@/utils/copyToClipboard.ts";
import { notifyUser } from "@/utils/notifyUser.ts";

const props = defineProps<{
  modelValue: Todo;
}>();

const emit = defineEmits<{
  (event: "update:model-value", value: Todo): void;
}>();

const editMode = ref(false);

const name = ref(props.modelValue.name);
const description = ref(props.modelValue.description);

const inputField = ref<HTMLInputElement>();

async function copy() {
  await copyToClipboard(
    `${props.modelValue.name}\n${props.modelValue.description}`,
  );
  notifyUser("Copied to clipboard");
}

watch(
  () => inputField.value,
  () => {
    if (inputField.value != null) {
      inputField.value.focus();
      inputField.value.select();
    }
  },
);

function save() {
  emit("update:model-value", {
    id: props.modelValue.id,
    name: name.value,
    description: description.value,
  });
  editMode.value = false;
}
</script>

<template>
  <div class="todoItem" data-testid="todoItem" @click="editMode = true">
    <template v-if="editMode">
      <TextField auto-focus v-model="name" label="Name" />
      <TextField v-model="description" label="Description" />
      <button @click.prevent.stop="save()">Save</button>
    </template>
    <template v-else>
      <h3>{{ modelValue.name }}</h3>
      <p>{{ modelValue.description }}</p>
      <button @click.stop="copy">Copy to clipboard</button>
    </template>
  </div>
</template>

<style scoped>
.todoItem {
  box-shadow: 1px 1px 1px;
  min-height: 100px;
  background-color: #eee;
  padding: 0 0.25rem;
}
</style>
