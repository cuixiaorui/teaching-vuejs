import { reactive } from "vue";
import { game } from "../game";

export function useEnemyPlane() {
  const width = 308;
  const height = 207;
  const enemyPlanes = reactive([
    {
      x: 100,
      y: 20,
      width,
      height,
    },
    {
      x: 300,
      y: 70,
      width,
      height,
    },
  ]);

  // move
  // const speed = 10;
  game.ticker.add(() => {
    enemyPlanes.forEach((enemy, index) => {
      // enemy.y += speed;

      // 当飞机超出屏幕后，应该移除掉

      if (enemy.y > 1080 + 100) {
        enemyPlanes.splice(index, 1);
      }
    });
  });

  return {
    enemyPlanes,
  };
}
