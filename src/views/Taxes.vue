<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import TaxItem from "../components/TaxItem.vue";
import Button from "../components/Button.vue";
import ChevronIcon from "../assets/ChevronIcon.vue";
import { useFormStore } from "../store/form";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    TaxItem,
    Button,
    ChevronIcon,
  },
  setup() {
    const form = useFormStore();
    const router = useRouter();
    const error = ref<boolean>(false);

    const handleValidate = () => {
      if (form.selectedTaxes().length === 0) {
        error.value = true;
      } else {
        error.value = false;
        router.push("/details");
      }
    };

    const handleChange = (id: number) => () => {
      form.checkTax(id);
    };
    watch(form.selectedTaxes(), () => {});
    return {
      handleValidate,
      handleChange,
      form,
      error,
    };
  },
});
</script>

<template>
  <div class="navigation">
    <ChevronIcon />
    Заплатить налоги за ИП
  </div>
  <div class="taxes container">
    <div class="inline">
      <div>Ваш доход за полугодие:</div>
      <div>{{ form.income }} ₸</div>
    </div>
    <div class="taxes-items">
      <TaxItem
        v-for="tax in form.taxes_with_price"
        :key="tax.id"
        :label="tax.label"
        :description="`${tax.percent}% от дохода`"
        :checked="tax.checked"
        :onChange="handleChange(tax.id)"
        :price="tax.price"
      />
    </div>
    <span class="error" v-show="error"
      >Должен быть выбран хотя бы один налог</span
    >
    <div class="inline">
      <div>Итого к оплате за полугодие:</div>
      <div class="total">{{ form.total() }} ₸</div>
    </div>
    <Button :onClick="handleValidate">Оплатить</Button>
  </div>
</template>

<style scoped>
.navigation {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  font-style: italic;
  padding: 0.5rem 1.5rem;
  margin-bottom: 1rem;
}
.inline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  font-style: italic;
  margin-bottom: 2rem;
}

.total {
  white-space: nowrap;
}
.taxes-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.error {
  background-color: rgba(253, 2, 2, 0.226);
  width: 100%;
  border: 1px solid rgb(121, 0, 0);
  color: rgb(121, 0, 0);
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 4rem;
  display: block;
}
</style>
