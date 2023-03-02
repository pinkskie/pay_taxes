<template>
  <input :value="value" @input="onInput" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "TextField",
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
  },
  // emits: [value]
  setup(_, { emit }) {
    function onInput(event: Event) {
      const target = event.target as HTMLInputElement;
      emit("update:value", target.value);
    }

    return { onInput };
  },
});
</script>
