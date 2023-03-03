<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";

import { tax_types, useFormStore } from "../store/form";

import Button from "./Button.vue";
import TextField from "./TextField.vue";
import Select from "./Select.vue";

import CloseIcon from "../assets/icons/CloseIcon.vue";

export default defineComponent({
  components: {
    Select,
    Button,
    TextField,
    CloseIcon,
  },
  emits: ["close"],
  setup() {
    const form = useFormStore();
    const router = useRouter();
    const regex = /^[0-9]+$/; // принимает только цифры

    const errors = reactive({
      name: "",
      last_name: "",
      iin: "",
      income: "",
    });

    const handleValidate = () => {
      // name validation
      if (!form.name.length) {
        errors.name = "Заполните поле";
      } else {
        errors.name = "";
      }

      // last_name validation
      if (!form.last_name.length) {
        errors.last_name = "Заполните поле";
      } else {
        errors.last_name = "";
      }

      // iin validation
      if (form.iin.length < 11) {
        errors.iin = "ИИН должен содержать 12 цифр";
      } else if (!regex.test(form.iin)) {
        errors.iin = "Введите только числа";
      } else {
        errors.iin = "";
      }

      // income validation
      if (!form.income) {
        errors.income = "Доход не может быть равен нулю";
      } else if (Number(form.income) < 0 || Number(form.income) > 150000000) {
        errors.income = "Доход не может быть больше 150 000 000";
      } else {
        errors.income = "";
      }

      if (Object.values(errors).every((el) => !el)) {
        router.push("/taxes");
      }
    };

    return {
      form,
      errors,
      options: tax_types,
      handleValidate,
    };
  },
});
</script>

<template>
  <div class="bottomSheet-header">
    Заплатить налоги за ИП
    <button @click="$emit('close')" class="close-btn">
      <CloseIcon />
    </button>
  </div>
  <div class="form">
    <p class="form-description">
      Теперь ИП на упрощенке обязан уплачивать за себя ИПН и социальный налог. В
      связи с этими изменениями ИП должен платить за себя:
    </p>
    <div class="user">
      <TextField
        label="Имя"
        type="text"
        placeholder="Имя"
        @change="form.changeName"
        :value="form.name"
        :error="errors.name"
      />
      <TextField
        label="Фамилия"
        type="text"
        placeholder="Фамилия"
        @change="form.changeLastName"
        :value="form.last_name"
        :error="errors.last_name"
      />
    </div>
    <TextField
      label="ИИН"
      type="text"
      placeholder="ИИН"
      @change="form.changeIin"
      :value="form.iin"
      :error="errors.iin"
      :maxlength="12"
    />
    <Select :options="options" @change="form.changeTaxType" />
    <TextField
      label="Ваш доход за пол года"
      type="number"
      placeholder="Сумма дохода"
      @change="form.changeIncome"
      :value="form.income === 0 ? '' : form.income.toString()"
      :error="errors.income"
    />
    <Button @onClick="handleValidate" variant="contained" class="btn-position">
      Рассчитать
    </Button>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 24px;
}

.form-description {
  line-height: 24px;
  margin-bottom: 16px;
}

.user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.bottomSheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  font-style: italic;
  padding: 0 24px;
  margin-bottom: 16px;
}

.btn-position {
  margin-top: 48px;
}

.close-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>
