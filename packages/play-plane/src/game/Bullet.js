import { reactive } from "vue";
import { game } from "../game";

export function useBullet() {
  const bullets = reactive([]);
  const width = 61;
  const height = 99;

  const addBullet = (info) => {
    bullets.push({ ...info, width, height });
  };

  // move

  // ticker
  const speed = 10;

  game.ticker.add(() => {
    bullets.forEach((bullet, index) => {
      bullet.y -= speed;

      // 如果超出屏幕呢 需要移除掉
      if (bullet.y <= -100) {
        bullets.splice(index, 1);
      }
    });
  });

  return {
    addBullet,
    bullets,
  };
}
