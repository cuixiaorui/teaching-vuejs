<template>
  <container>
    <sprite :texture="endPageImg"></sprite>
    <sprite
      :texture="restartBtnImg"
      x="225"
      y="525"
      @click="onClick"
      :interactive="true"
    ></sprite>
  </container>
</template>

<script>
import endPageImg from "../assets/end_page.jpg";
import restartBtnImg from "../assets/restartBtn.png";
export default {
  setup(_, { emit }) {
    const onClick = () => {
      emit("change-page", "GamePage");
    };

    return {
      onClick,
      endPageImg,
      restartBtnImg,
    };
  },
};
</script>

<style lang="scss" scoped></style>
