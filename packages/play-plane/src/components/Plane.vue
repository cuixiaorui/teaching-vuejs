<template>
  <container>
    <sprite :texture="planeImg"></sprite>
  </container>
</template>

<script>
import planeImg from "../assets/plane.png";
export default {
  setup() {
    return {
      planeImg,
    };
  },
};
</script>

<style lang="scss" scoped></style>
