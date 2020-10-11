// 实现基于 canvas 自定义的渲染器
import { createRenderer } from "vue";

const renderer = createRenderer({});

export function createApp(rootComponent) {
  return renderer.createApp(rootComponent);
}
