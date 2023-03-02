<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Button from "../components/Button.vue";

export default defineComponent({
  name: "NotFound",
  components: {
    Button,
  },
  setup() {
    const router = useRouter();

    const handleClick = () => {
      router.push("/");
    };

    return {
      handleClick,
    };
  },
});
</script>

<template>
  <div class="NotFound">
    <img src="../assets/404.png" alt="404" />
    <Button :onClick="handleClick" variant="text">
      Вернуться на главную
    </Button>
  </div>
</template>

<style>
.NotFound {
  width: 100%;
  height: 100vh;
  font-size: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  flex-direction: column;
}

@media screen and (max-width: 762px) {
  .NotFound {
    font-size: 2rem;
  }
}
</style>
