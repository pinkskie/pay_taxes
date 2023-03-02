<script lang="ts">
import TaxItem from "../components/TaxItem.vue";
import Button from "../components/Button.vue";
import ChevronIcon from "../assets/ChevronIcon.vue";
import { useFormStore } from "../store/form";

export default {
  components: {
    TaxItem,
    Button,
    ChevronIcon,
  },
  setup() {
    const form = useFormStore();

    const handleClick = () => {
      alert(1);
    };

    const handleChange = (id: number) => () => {
      form.checkTax(id);
    };
    return {
      handleClick,
      handleChange,
      form,
    };
  },
};
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
    <div class="inline">
      <div>Итого к оплате за полугодие:</div>
      <div>{{ form.total() }} ₸</div>
    </div>
    <Button :onClick="handleClick">Оплатить</Button>
  </div>
</template>

<style scoped>
.inline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  font-style: italic;
  margin-bottom: 2rem;
}
.navigation {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  font-style: italic;
  padding: 0.5rem 1.5rem;
  margin-bottom: 1rem;
}
.taxes-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 5rem;
}
</style>
