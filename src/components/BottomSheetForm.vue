<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";

import { useFormStore } from "../store/form";

import Button from "./Button.vue";
import TextField from "./TextField.vue";
import Select from "./Select.vue";

import KrestikIcon from "../assets/icons/KrestikIcon.vue";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    Select,
    Button,
    TextField,
    KrestikIcon,
    VueBottomSheet,
  },
  emits: ["close"],
  setup() {
    const bottomSheet = ref<InstanceType<typeof VueBottomSheet> | null>(null);
    const form = useFormStore();
    const router = useRouter();
    const regex = /^[0-9]+$/; // принимает только цифры

    const closeBottomSheet = () => {
      close;
    };

    const errors = reactive({
      name: "",
      last_name: "",
      iin: "",
      income: "",
    });

    const maxLength = () => {
      console.log(form.iin.length);
      if (form.iin.length === 12) {
        return;
      }
    };

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
        errors.iin = "Введите только числа"; // тут можно было бы просто прописать type=number, просто для практики
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

      if (
        (!!errors.name ||
          !!errors.last_name ||
          !!errors.iin ||
          !!errors.income) === false
      ) {
        router.push("/taxes");
      }
    };

    return {
      form,
      errors,
      bottomSheet,
      maxLength,
      handleValidate,
      closeBottomSheet,
    };
  },
});
</script>

<template>
  <div class="bottomSheet-header">
    Заплатить налоги за ИП
    <button @click="$emit('close')" class="krestik">
      <KrestikIcon />
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
        @update:value="form.changeName"
        :keypress="maxLength"
        :value="form.name"
        :error="errors.name"
      />
      <TextField
        label="Фамилия"
        type="text"
        placeholder="Фамилия"
        @update:value="form.changeLastName"
        :value="form.last_name"
        :error="errors.last_name"
      />
    </div>
    <TextField
      label="ИНН"
      type="text"
      placeholder="ИНН"
      @update:value="form.changeIin"
      :value="form.iin"
      :error="errors.iin"
      :maxLength="12"
    />
    <Select />
    <TextField
      label="Ваш доход за пол года"
      type="number"
      placeholder="Сумма дохода"
      @update:value="form.changeIncome"
      :value="form.income === 0 ? '' : form.income.toString()"
      :error="errors.income"
    />
    <Button @onClick="handleValidate" variant="contained" class="btn-position"
      >Рассчитать</Button
    >
  </div>
</template>

<style>
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

.krestik {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>
