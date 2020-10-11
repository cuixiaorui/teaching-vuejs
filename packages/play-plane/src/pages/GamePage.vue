<template>
  <container>
    <Map></Map>
    <Plane :x="planeInfo.x" :y="planeInfo.y"></Plane>
    <EnemyPlane
      v-for="(enemy, index) in enemyPlanes"
      :key="index"
      :x="enemy.x"
      :y="enemy.y"
    ></EnemyPlane>
  </container>
</template>

<script>
// import { reactive } from "vue";
import Map from "../components/Map";
import Plane from "../components/Plane";
import EnemyPlane from "../components/EnemyPlane";
import { usePlane } from "../game/Plane";
import { useEnemyPlane } from "../game/EnemyPlane";
export default {
  components: {
    Map,
    Plane,
    EnemyPlane,
  },
  setup() {
    const { planeInfo } = usePlane();
    const { enemyPlanes } = useEnemyPlane();

    return {
      planeInfo,
      enemyPlanes,
    };
  },
};
</script>

<style lang="scss" scoped></style>
