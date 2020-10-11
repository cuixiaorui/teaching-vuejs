import { onMounted, onUnmounted } from "vue";
import { game } from "../game";
import { hitTestObject } from "../utils";
export function useFighting({ plane, enemyPlanes, bullets, gameOver }) {
  const handleTicker = () => {
    enemyPlanes.forEach((enemy) => {
      // 1. 我方飞机和敌方飞机的碰撞
      if (hitTestObject(enemy, plane)) {
        // game over
        console.log("hit");
        // 跳转到 游戏结束页面
        gameOver && gameOver();
      }
    });

    // 2. 我方子弹和敌方飞机的碰撞
    bullets.forEach((bullet, bulletIndex) => {
      enemyPlanes.forEach((enemy, enemyIndex) => {
        if (hitTestObject(bullet, enemy)) {
          // 都应该销毁掉
          bullets.splice(bulletIndex, 1);
          enemyPlanes.splice(enemyIndex, 1);
        }
      });
    });
  };

  onMounted(() => {
    game.ticker.add(handleTicker);
  });

  onUnmounted(() => {
    game.ticker.remove(handleTicker);
  });
}
