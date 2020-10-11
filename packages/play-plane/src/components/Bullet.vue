<template>
  <container>
    <sprite :texture="bulletImg"></sprite>
  </container>
</template>

<script>
import bulletImg from "../assets/bullet.png";
export default {
  setup() {
    return {
      bulletImg,
    };
  },
};
</script>

<style lang="scss" scoped></style>
