import { defineStore } from "pinia";

export const tax_types = [
  { label: "Упрощенный", value: 1 },
  { label: "Общеустановленный", value: 2 },
];

export interface ITaxesWithPrice {
  id: number;
  label: string;
  checked: boolean;
  not_less?: number;
  percent: number;
  price: number;
}

export const useFormStore = defineStore({
  id: "form",
  state: () => ({
    is_modal_open: false,
    name: "",
    last_name: "",
    iin: "",
    tax_type: { label: "Упрощенный", value: 1 },
    income: 0,
    taxes: [
      { id: 1, label: "ИПН", checked: false, percent: 3 },
      { id: 2, label: "СО", checked: false, not_less: 5000, percent: 3.5 },
      { id: 3, label: "ОПВ", checked: false, percent: 10 },
      { id: 4, label: "ВОСМС", checked: false, percent: 5 },
    ],
  }),
  getters: {
    taxes_with_price: (state): ITaxesWithPrice[] => {
      const calcPrice = (percent: number) => {
        return (state.income / 100) * percent;
      };

      return state.taxes.map((item) => ({
        ...item,
        price: calcPrice(item.percent),
      }));
    },
    selectedTaxes() {
      return () => this.taxes_with_price.filter((item) => item.checked);
    },
    total() {
      return () =>
        this.selectedTaxes().reduce((acc, cur) => acc + cur.price, 0);
    },
  },
  actions: {
    checkTax(id: number) {
      this.taxes = this.taxes.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
    },
    changeName(value: string) {
      this.name = value;
    },
    changeLastName(value: string) {
      this.last_name = value;
    },
    changeIin(value: string) {
      this.iin = value;
    },
    changeTaxType(value: number) {
      const selected_type = tax_types.find((item) => item.value === value);

      if (selected_type) {
        this.tax_type = selected_type;
      }
    },
    changeIncome(value: number) {
      this.income = value;
    },
  },
});
