<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { nanoid } from "nanoid";

type Props = {
  label: string;
  modelValue: string;
  autoFocus?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  autoFocus: false,
});
const emit = defineEmits<{
  (event: "update:model-value", value: string): void;
}>();

const editedValue = ref(props.modelValue);
const inputField = ref<HTMLInputElement>();
if (props.autoFocus) {
  onMounted(() => {
    inputField.value?.focus();
  });
}

function onFocus() {
  inputField.value?.select();
}

function save() {
  if (editedValue.value == null) return;
  emit("update:model-value", editedValue.value);
}

const id = nanoid();
</script>
<template>
  <div>
    <label :for="id">{{ props.label }}</label>
    <input
      :id="id"
      ref="inputField"
      type="text"
      v-model="editedValue"
      @keyup.enter="save"
      @blur="save"
      @focus="onFocus"
    />
  </div>
</template>
