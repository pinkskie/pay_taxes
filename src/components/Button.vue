<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Button",
  emits: ["onClick"],
  props: {
    variant: {
      type: String,
      required: false,
      default: "contained",
    },
  },
});
</script>

<template>
  <button class="btn" :class="variant" @click="$emit('onClick')">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  padding: 16px;
  font-size: 20px;
  width: 100%;
  font-style: italic;
  border: none;
  outline: none;
  border-radius: 6px;
  transition: 0.2s ease;
  cursor: pointer;
  font-family: "Cuprum", sans-serif;
}
.contained {
  color: white;
  background-color: black;
}

.outlined {
  background-color: white;
  border: 1px solid black;
  width: fit-content;
}
.text {
  background-color: white;
  padding: 0;
  color: #000;
}

.contained:hover {
  box-shadow: 0px 0px 24px #9d9d9d;
}
.contained:focus {
  box-shadow: 0px 0px 24px #9d9d9d;
}

.outlined:hover {
  background-color: #000;
  color: white;
}
.outlined:focus {
  background-color: #000;
  color: white;
}

.text:hover {
  transform: scale(1.05);
}
.text:focus {
  transform: scale(1.05);
}
</style>
