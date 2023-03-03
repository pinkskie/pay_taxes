<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ITaxesWithPrice } from "../store/form";

import DetailsIcon from "../assets/icons/DetailsIcon.vue";

export default defineComponent({
  name: "TaxItem",
  components: {
    DetailsIcon,
  },
  emits: ["change"],
  props: {
    tax: {
      type: Object as PropType<ITaxesWithPrice>,
      required: true,
    },
  },
  setup(props) {
    const isDisabled = () => {
      if (props.tax?.not_less) {
        return props.tax.price < props.tax.not_less;
      }
      return false;
    };

    return {
      isDisabled,
    };
  },
});
</script>

<template>
  <div class="tax-item">
    <div class="head">
      <label class="label" :class="[isDisabled() && 'disable']">
        <input
          type="checkbox"
          :checked="tax.checked"
          @change="$emit('change', tax.id)"
          :disabled="isDisabled()"
        />
        <span class="checkmark"></span>
        <h2 class="text">
          {{ tax.label }}
          <span>
            ( {{ tax.percent }}% от дохода
            {{ tax.not_less && `но не меньше ${tax.not_less} ₸` }} )
          </span>
        </h2>
      </label>
    </div>
    <Transition>
      <div class="body" v-show="tax.checked">
        <h2 class="text">{{ tax.price.toLocaleString() }} ₸</h2>
        <DetailsIcon />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.label {
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.disable {
  opacity: 0.4;
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

input:checked ~ .checkmark {
  background-color: black;
  border: 1px solid transparent;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

input:checked ~ .checkmark:after {
  display: block;
}

.checkmark:after {
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
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
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
  font-size: 24px;
  text-align: right;
}

.text span {
  display: block;
  color: #9d9d9d;
  font-size: 14px;
  max-width: 120px;
}
</style>
