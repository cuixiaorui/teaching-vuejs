<template>
  <container>
    <sprite :texture="enemyImg"></sprite>
  </container>
</template>

<script>
import enemyImg from "../assets/enemy.png";
export default {
  setup() {
    return {
      enemyImg,
    };
  },
};
</script>

<style lang="scss" scoped></style>
