<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import ChevronIcon from "../assets/icons/ChevronIcon.vue";
import { useFormStore } from "../store/form";

export default defineComponent({
  components: { ChevronIcon },
  props: {
    options: {
      type: Array as PropType<{ label: string; value: number }[]>,
      required: true,
    },
  },
  emits: ["change"],
  setup(_, { emit }) {
    const form = useFormStore();
    const isOpen = ref<boolean>(false);

    const toggleOptions = () => {
      isOpen.value = !isOpen.value;
    };

    const selectOption = (value: number) => {
      emit("change", value);
      toggleOptions;
    };

    return {
      form,
      isOpen,
      selectOption,
      toggleOptions,
    };
  },
});
</script>

<template>
  <div class="select" :class="[isOpen && 'active']" @click="toggleOptions">
    {{ form.tax_type.label }}
    <ChevronIcon />
    <Transition>
      <ul class="options" v-show="isOpen">
        <li
          class="option"
          :class="[form.tax_type.value === option.value && 'active-option']"
          v-for="option in options"
          :key="option.label"
          :value="option.value"
          @click="selectOption(option.value)"
        >
          {{ option.label }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.select {
  width: 100%;
  border: 1px solid #dfe3e6;
  padding: 10px 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.select svg {
  transform: rotate(-90deg);
  margin-right: 10px;
}

.select svg > path {
  fill: #dfe3e6;
  transition: 0.2s ease;
}

.options {
  position: absolute;
  bottom: -85px;
  left: 0;
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
  width: 100%;
  list-style: none;
  z-index: 10;
  max-height: 160px;
  overflow-y: scroll;
}
.option {
  padding: 10px;
  outline: none;
  border: 1px solid transparent;
  transition: 0.1s ease;
}

.active-option {
  background: rgba(0, 0, 0, 0.1);
}

.option:hover {
  background-color: black;
  border: 1px solid black;
  color: white;
  outline: none;
}

.active svg > path {
  fill: black;
}
</style>
