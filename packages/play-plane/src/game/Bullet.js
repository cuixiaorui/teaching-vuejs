import { reactive } from "vue";
import { game } from "../game";

export function useBullet() {
  const bullets = reactive([]);

  const addBullet = (info) => {
    bullets.push(info);
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
