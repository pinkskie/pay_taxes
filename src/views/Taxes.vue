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
      <div>{{ form.income.toLocaleString() }} ₸</div>
    </div>
    <div class="taxes-items">
      <TaxItem
        v-for="tax in form.taxes_with_price"
        :tax="tax"
        :key="tax.id"
        :onChange="handleChange(tax.id)"
      />
    </div>
    <span class="error" v-show="error"
      >Должен быть выбран хотя бы один налог</span
    >
    <div class="submit">
      <div class="sum">
        <div>Итого к оплате за полугодие:</div>
        <div class="total">{{ form.total().toLocaleString() }} ₸</div>
      </div>
      <Button @onClick="handleValidate">Оплатить</Button>
    </div>
  </div>
</template>

<style scoped>
.navigation {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 24px;
  font-style: italic;
  padding: 10px 24px;
  margin-bottom: 16px;
}
.income {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  font-style: italic;
  margin-bottom: 32px;
}

.sum {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  font-style: italic;
  margin-top: 64px;
  margin-bottom: 32px;
}
.total {
  white-space: nowrap;
}
.taxes-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.error {
  background-color: rgba(253, 2, 2, 0.226);
  width: 100%;
  border: 1px solid rgb(121, 0, 0);
  color: rgb(121, 0, 0);
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 16px;
  display: block;
}
</style>
