<template>
  <container>
    <sprite :texture="mapImg"></sprite>
  </container>
</template>

<script>
import mapImg from "../assets/map.jpg";
export default {
  setup() {
    return {
      mapImg,
    };
  },
};
</script>

<style lang="scss" scoped></style>
