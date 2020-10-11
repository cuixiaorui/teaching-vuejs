<template>
  <container>
    <sprite :texture="startPageImg"></sprite>
    <sprite
      :texture="startBtnImg"
      x="225"
      y="525"
      @click="onClick"
      :interactive="true"
    ></sprite>
  </container>
</template>

<script>
import startPageImg from "../assets/start_page.jpg";
import startBtnImg from "../assets/startBtn.png";
export default {
  setup(_,{emit}) {
    const onClick = () => {
      emit("change-page","GamePage")
    };

    return {
      onClick,
      startPageImg,
      startBtnImg,
    };
  },
};
</script>

<style lang="scss" scoped></style>
