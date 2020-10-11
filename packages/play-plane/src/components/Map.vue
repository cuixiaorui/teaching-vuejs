<template>
  <container>
    <sprite :texture="mapImg" :y="mapY1"></sprite>
    <sprite :texture="mapImg" :y="mapY2"></sprite>
  </container>
</template>

<script>
import { ref } from "vue";
import mapImg from "../assets/map.jpg";
import { game } from "../game";
export default {
  setup() {
    const viewHeight = 1080;
    const mapY1 = ref(0);
    const mapY2 = ref(-viewHeight);

    // setInterval(() => {
    //
    // }, interval);

    // pixi.js -> ticker -> 帧循环
    const speed = 10;
    game.ticker.add(() => {
      mapY1.value += speed;
      mapY2.value += speed;

      if (mapY1.value >= viewHeight) {
        mapY1.value = -viewHeight;
      }

      if (mapY2.value >= viewHeight) {
        mapY2.value = -viewHeight;
      }
    });

    return {
      mapY1,
      mapY2,
      mapImg,
    };
  },
};
</script>

<style lang="scss" scoped></style>
