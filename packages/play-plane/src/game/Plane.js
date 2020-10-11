import { reactive } from "vue";

export function usePlane() {
  const planeInfo = reactive({
    x: 150,
    y: 150,
  });

  const speed = 10;

  window.addEventListener("keyup", (e) => {
    switch (e.code) {
      case "ArrowUp":
        planeInfo.y -= speed;
        break;
      case "ArrowDown":
        planeInfo.y += speed;
        break;
      case "ArrowLeft":
        planeInfo.x -= speed;
        break;
      case "ArrowRight":
        planeInfo.x += speed;
        break;

      default:
        break;
    }
  });

  return {
    planeInfo,
  };
}
