import { reactive } from "vue";
import { game } from "../game";

export function useEnemyPlane() {
  const enemyPlanes = reactive([
    {
      x: 100,
      y: 20,
    },
    {
      x: 300,
      y: 70,
    },
  ]);

  // move
  const speed = 10;
  game.ticker.add(() => {
    enemyPlanes.forEach((enemy, index) => {
      enemy.y += speed;

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
