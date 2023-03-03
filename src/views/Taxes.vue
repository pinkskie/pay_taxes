<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import TaxItem from "../components/TaxItem.vue";
import Button from "../components/Button.vue";
import ChevronIcon from "../assets/icons/ChevronIcon.vue";
import { useFormStore } from "../store/form";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    TaxItem,
    Button,
    ChevronIcon,
  },
  setup() {
    const error = ref<boolean>(false);
    const form = useFormStore();
    const router = useRouter();

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

    watch(form.selectedTaxes, () => {
      if (form.selectedTaxes().length !== 0) {
        error.value = false;
      }
    });

    return {
      form,
      error,
      handleChange,
      handleValidate,
    };
  },
});
</script>

<template>
  <router-link to="/" class="navigation">
    <ChevronIcon />
    Заплатить налоги за ИП
  </router-link>
  <div class="taxes container">
    <div class="income">
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
    <div class="sum">
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
.income {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  font-style: italic;
  margin-bottom: 2rem;
}

.sum {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  font-style: italic;
  margin-top: 4rem;
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
  margin-bottom: 1rem;
  display: block;
}
</style>
