<script lang="ts">
import { defineComponent, ref } from "vue";
import ChevronIcon from "../assets/icons/ChevronIcon.vue";
import { useFormStore } from "../store/form";
import { tax_types } from "../store/form";

export default defineComponent({
  components: { ChevronIcon },

  setup() {
    const form = useFormStore();
    const options = tax_types;
    const openOptions = ref<boolean>();
    const toggleOptions = () => {
      openOptions.value = !openOptions.value;
    };
    const selectOption = (value: number) => {
      form.changeTaxType(value);
      toggleOptions;
    };
    return {
      form,
      options,
      openOptions,
      toggleOptions,
      selectOption,
    };
  },
});
</script>

<template>
  <div class="select" @click="toggleOptions">
    {{ form.tax_type.label }}
    <ChevronIcon />
    <Transition>
      <div class="options" v-show="openOptions">
        <li
          class="option"
          v-for="option in options"
          :key="option.label"
          :value="option.value"
          @click="selectOption(option.value)"
        >
          {{ option.label }}
        </li>
      </div>
    </Transition>
  </div>
</template>

<style>
.select {
  width: 100%;
  border: 1px solid #dfe3e6;
  padding: 0.7rem 0.5rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.select svg {
  transform: rotate(-90deg);
  margin-right: 0.5rem;
}

.select svg > path {
  fill: #dfe3e6;
}

.options {
  position: absolute;
  bottom: -5rem;
  left: 0;
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
  width: 100%;
  list-style: none;
  z-index: 10;
  max-height: 5rem;
  overflow-y: scroll;
}
.option {
  padding: 0.5rem;
  outline: none;
  border: 1px solid transparent;
  transition: 0.1s ease;
}
.option:hover {
  background-color: black;
  border: 1px solid black;
  color: white;
  outline: none;
}
</style>
