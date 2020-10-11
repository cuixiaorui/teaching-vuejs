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
    <Bullet
      v-for="(bullet, index) in bullets"
      :key="index"
      :x="bullet.x"
      :y="bullet.y"
    ></Bullet>
  </container>
</template>

<script>
// import { reactive } from "vue";
import Bullet from "../components/Bullet";
import Map from "../components/Map";
import Plane from "../components/Plane";
import EnemyPlane from "../components/EnemyPlane";
import { usePlane } from "../game/Plane";
import { useEnemyPlane } from "../game/EnemyPlane";
import { useBullet } from "../game/Bullet";
import { useFighting } from "../game/Fighting";
export default {
  components: {
    Map,
    Plane,
    EnemyPlane,
    Bullet,
  },
  setup(_, { emit }) {
    const { bullets, addBullet } = useBullet();
    const { planeInfo } = usePlane({
      attack(info) {
        addBullet(info);
      },
    });
    const { enemyPlanes } = useEnemyPlane();

    useFighting({
      plane: planeInfo,
      enemyPlanes,
      bullets,
      gameOver() {
        emit("change-page", "EndPage");
      },
    });

    return {
      planeInfo,
      enemyPlanes,
      bullets,
    };
  },
};
</script>

<style lang="scss" scoped></style>
