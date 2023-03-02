<script lang="ts">
import { defineComponent, PropType } from "vue";
import DetailsIcon from "../assets/DetailsIcon.vue";

export default defineComponent({
  name: "TaxItem",
  components: {
    DetailsIcon,
  },
  props: {
    label: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    checked: {
      type: Boolean,
    },
    onChange: {
      type: Function as PropType<() => void>,
    },
  },
});
</script>

<template>
  <div class="tax-item">
    <div class="head">
      <label class="label">
        <input type="checkbox" :checked="checked" @change="onChange" />
        <span class="checkmark"></span>
      </label>
      <h2 class="text">
        {{ label }}<span>( {{ description }} )</span>
      </h2>
    </div>
    <Transition>
      <div class="body" v-show="checked">
        <h2 class="text">{{ price }} ₸</h2>
        <DetailsIcon />
      </div>
    </Transition>
  </div>
</template>

<style>
.label {
  user-select: none;
  cursor: pointer;
}

.label input {
  display: none;
}

.checkmark {
  position: relative;
  height: 25px;
  width: 25px;
  border-radius: 100%;
  border: 1px solid #dfe3e6;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container input:checked ~ .checkmark {
  background-color: black;
  border: 1px solid transparent;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.tax-item {
  background: #ffffff;
  box-shadow: 0px 0px 24px #9d9d9d;
  border-radius: 6px;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 1.5rem;
  text-align: right;
}

.text span {
  display: block;
  color: #9d9d9d;
  font-size: 0.75rem;
}

.circle {
  border: 1px solid #dfe3e6;
  border-radius: 100%;
  height: 25px;
  width: 25px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
