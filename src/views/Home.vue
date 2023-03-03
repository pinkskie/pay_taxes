<script lang="ts">
import Button from "../components/Button.vue";
import TextField from "../components/TextField.vue";
import CustomSelect from "../components/CustomSelect.vue";
import KrestikIcon from "../assets/KrestikIcon.vue";
import { defineComponent, reactive, ref } from "vue";
import { useFormStore } from "../store/form";
import { useRouter } from "vue-router";
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";

export default defineComponent({
  components: {
    Button,
    TextField,
    KrestikIcon,
    VueBottomSheet,
  },
  setup() {
    const form = useFormStore();
    const router = useRouter();

    const bottomSheet = ref<InstanceType<typeof VueBottomSheet> | null>(null);

    const open = () => {
      bottomSheet.value.open();
    };

    const close = () => {
      bottomSheet.value.close();
    };

    const errors = reactive({
      name: "",
      last_name: "",
      iin: "",
      income: "",
    });

    // const open = () => {};

    const keypress = () => {
      console.log("e");
    };

    const handleValidate = () => {
      if (!form.name.length || !form.last_name.length || !form.iin) {
        errors.name = "Заполните поле";
        errors.last_name = "Заполните поле";
      } else {
        errors.name = "";
        errors.last_name = "";
      }

      if (form.iin.length < 11) {
        errors.iin = "Минимальное количество символов 12";
      } else {
        errors.iin = "";
      }

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
      open,
      close,
      form,
      handleValidate,
      keypress,
      errors,
      bottomSheet,
    };
  },
});
</script>

<template>
  <div class="home">
    <vue-bottom-sheet ref="bottomSheet" max-height="90%">
      <div class="bottomSheet-header">
        Заплатить налоги за ИП
        <button :onClick="close" class="krestik"><KrestikIcon /></button>
      </div>
      <div class="form">
        <p class="form-description">
          Теперь ИП на упрощенке обязан уплачивать за себя ИПН и социальный
          налог. В связи с этими изменениями ИП должен платить за себя:
        </p>
        <div class="user">
          <TextField
            label="Имя"
            type="text"
            placeholder="Имя"
            @update:value="form.changeName"
            :keypress="keypress"
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
        />
        <TextField
          label="Ваш доход за пол года"
          type="number"
          placeholder="Сумма дохода"
          @update:value="form.changeIncome"
          :value="form.income.toString()"
          :error="errors.income"
        />
        <Button
          :onClick="handleValidate"
          variant="contained"
          class="btn-position"
          >Рассчитать</Button
        >
      </div>
    </vue-bottom-sheet>

    <!-- <CustomSelect
      :options="['go', 'python', 'rust', 'javascript']"
      :default="'go'"
    /> -->
    <Button :onClick="open" variant="outlined">Налоговый вычет</Button>
  </div>
</template>

<style>
.home {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 1.5rem 1.5rem 0 1.5rem;
}

.form-description {
  line-height: 1.5rem;
  margin-bottom: 1rem;
}
.user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.select {
  width: 100%;
  border: 1px solid #dfe3e6;
  padding: 0.5rem;
}
.bottomSheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  font-style: italic;
  padding: 0 1.5rem;
  margin-bottom: 1rem;
}

.btn-position {
  margin-top: 3rem;
}

.krestik {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>
