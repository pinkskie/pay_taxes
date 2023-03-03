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

    const handleChange = (id: number) => {
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
  <main class="main">
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
          @change="handleChange"
        />
        <span class="error" v-show="error">
          Должен быть выбран хотя бы один налог
        </span>
      </div>
    </div>
    <div class="submit container">
      <div class="sum">
        <div>Итого к оплате за полугодие:</div>
        <div class="total">{{ form.total().toLocaleString() }} ₸</div>
      </div>
      <Button @onClick="handleValidate">Оплатить</Button>
    </div>
  </main>
</template>

<style scoped>
.main {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 24px;
  font-style: italic;
  padding: 10px 24px;
  margin-bottom: 16px;
  background-color: white;
}

.taxes {
  height: 100%;
  overflow-y: scroll;
  gap: 32px;
  display: flex;
  flex-direction: column;
}

.submit {
  background: rgb(255, 255, 255);
  align-self: flex-end;
  width: 100%;
  gap: 32px;
  display: flex;
  flex-direction: column;
}

.income {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  font-style: italic;
}

.taxes-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.error {
  background-color: rgb(253 2 2 / 20%);
  width: 100%;
  color: rgb(121, 0, 0);
  padding: 15px 25px;
  border-radius: 4px;
  display: block;
  margin-top: 16px;
}

.sum {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  font-style: italic;
}

.total {
  white-space: nowrap;
}
</style>
