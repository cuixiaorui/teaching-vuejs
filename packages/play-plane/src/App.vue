<template>
  <container>
    <page @change-page="handleChangePage"></page>
  </container>
</template>

<script>
import { ref, computed } from "vue";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import EndPage from "./pages/EndPage";
export default {
  name: "App",
  setup() {
    const currentPageName = ref("StartPage");
    const handleChangePage = (pageName) => {
      currentPageName.value = pageName;
    };

    const page = computed(() => {
      if (currentPageName.value === "StartPage") {
        return StartPage;
      } else if (currentPageName.value === "GamePage") {
        return GamePage;
      } else if (currentPageName.value === "EndPage") {
        return EndPage;
      }
    });

    return {
      handleChangePage,
      page,
    };
  },
};
</script>

<style></style>
