<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "TextField",
  props: {
    label: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    error: {
      type: String,
    },
    keypress: {
      type: Function as PropType<() => void>,
    },
  },
  emits: ["update:value"],
});
</script>

<template>
  <label class="label">
    {{ label }}
    <input
      class="textfield"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
    />
    <span class="error" v-show="error">{{ error }}</span>
  </label>
</template>

<style scoped>
.label {
  display: flex;
  flex-direction: column;
  font-style: italic;
  gap: 0.7rem;
  font-size: 1.15rem;
  width: 100%;
  position: relative;
}
.textfield {
  padding: 0.7rem 0.5rem;
  border: 1px solid #dfe3e6;
  border-radius: 3px;
  outline: none;
  transition: 0.2s ease;
  font-family: "Cuprum", sans-serif;
  font-size: 1rem;
}

.textfield:focus {
  border: 1px solid black;
}
.error {
  margin-top: -0.3rem;
  font-size: 0.75rem;
  color: red;
  display: block;
  position: absolute;
  bottom: -1.3rem;
  left: 0;
}
</style>
