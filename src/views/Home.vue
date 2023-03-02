<script setup lang="ts">
import Button from "../components/Button.vue";
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { defineComponent, ref } from "vue";

// export default defineComponent({
// components: {
//   Button,
//   VueBottomSheet,
// },
// setup() {
const myBottomSheet = ref<boolean>(false);

const open = () => {
  myBottomSheet.value = true;
};

const close = () => {
  myBottomSheet.value = false;
};
const handleClick = () => {
  open();
};
// },
// });
</script>

<template>
  <div class="home">
    <vue-bottom-sheet @opened="myBottomSheet">
      <h1>Lorem Ipsum</h1>
      <h2>What is Lorem Ipsum?</h2>
      <p><strong>Lorem Ipsum</strong> is simply dummy text</p>
    </vue-bottom-sheet>
    <Button :onClick="handleClick" variant="outlined">Налоговый вычет</Button>
  </div>
</template>

<style>
.home {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
