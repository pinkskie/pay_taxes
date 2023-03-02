<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import Button from "../components/Button.vue";
import CheckIcon from "../assets/CheckIcon.vue";
import { useFormStore } from "../store/form";

export default defineComponent({
  components: { Button, CheckIcon },
  setup() {
    const router = useRouter();
    const form = useFormStore();

    const handleClick = () => {
      router.push("/");
    };

    return {
      handleClick,
      form,
    };
  },
});
</script>
<template>
  <div class="details container">
    <p class="title">
      Спасибо! <br />
      Налоги успешно оплачены!
      <CheckIcon />
    </p>
    <div class="information">
      <p class="information-text">
        <span>Имя</span>
        <span>{{ form.name }}</span>
      </p>
      <p class="information-text">
        <span>Фамилия</span>
        <span>{{ form.last_name }}</span>
      </p>
      <p class="information-text">
        <span>ИИН</span>
        <span>{{ form.iin }}</span>
      </p>
      <p class="information-text">
        <span>Режим налогообложения</span>
        <span>{{ form.tax_type.label }}</span>
      </p>
      <p class="information-text">
        <span>Ваш доход за пол года</span>
        <span>{{ form.income }} ₸ </span>
      </p>
      <p
        class="information-text"
        v-for="tax in form.selectedTaxes()"
        :key="tax.id"
      >
        <span>{{ tax.label }}</span>
        <span>{{ tax.price }} ₸</span>
      </p>
      <p class="information-text total">
        <span>Итого оплачено за полугодие:</span>
        <span>{{ form.total() }} ₸</span>
      </p>
    </div>
    <Button :onClick="handleClick" variant="text">Вернуться на главную</Button>
  </div>
</template>

<style scoped>
.details {
  height: calc(100vh - 3rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 2rem;
  font-style: italic;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
}

.information {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-style: italic;
}

.information-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.total {
  margin-top: 2rem;
}
</style>
