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
  gap: 12px;
  font-size: 18px;
  width: 100%;
  position: relative;
}
.textfield {
  padding: 10px 8px;
  border: 1px solid #dfe3e6;
  border-radius: 3px;
  outline: none;
  transition: 0.2s ease;
  font-family: "Cuprum", sans-serif;
  font-size: 16px;
}

.textfield:focus {
  border: 1px solid black;
}
.error {
  margin-top: -0.48px;
  font-size: 14px;
  color: red;
  display: block;
  position: absolute;
  bottom: -20px;
  left: 0;
}
</style>
