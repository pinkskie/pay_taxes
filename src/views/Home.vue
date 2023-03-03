<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";

import Button from "../components/Button.vue";
import BottomSheetForm from "../components/BottomSheetForm.vue";

import "@webzlodimir/vue-bottom-sheet/dist/style.css";

export default defineComponent({
  components: {
    Button,
    BottomSheetForm,
    VueBottomSheet,
  },
  setup() {
    const bottomSheet = ref<InstanceType<typeof VueBottomSheet> | null>(null);

    const openBottomSheet = () => {
      bottomSheet.value.open();
    };

    const closeBottomSheet = () => {
      bottomSheet.value.close();
    };

    return {
      bottomSheet,
      openBottomSheet,
      closeBottomSheet,
    };
  },
});
</script>

<template>
  <div class="home">
    <Button @onClick="openBottomSheet" variant="outlined"
      >Налоговый вычет</Button
    >
    <vue-bottom-sheet ref="bottomSheet" max-height="90%">
      <BottomSheetForm @close="closeBottomSheet" />
    </vue-bottom-sheet>
  </div>
</template>

<style scoped>
.home {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
