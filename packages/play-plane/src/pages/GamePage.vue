<template>
  <container>
    <Map></Map>
    <Plane :x="planeInfo.x" :y="planeInfo.y"></Plane>
  </container>
</template>

<script>
// import { reactive } from "vue";
import Map from "../components/Map";
import Plane from "../components/Plane";
import { usePlane } from "../game/Plane";
export default {
  components: {
    Map,
    Plane,
  },
  setup() {
    const { planeInfo } = usePlane();
    return {
      planeInfo,
    };
  },
};
</script>

<style lang="scss" scoped></style>
