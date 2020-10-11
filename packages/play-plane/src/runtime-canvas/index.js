// 实现基于 canvas 自定义的渲染器
import { createRenderer } from "vue";
import { Container } from "pixi.js";

const renderer = createRenderer({
  createElement(type) {
    let element;
    switch (type) {
      case "container":
        element = new Container();
        break;
    }

    return element;
  },

  insert(el, parent) {
    if (el) {
      parent.addChild(el);
    }
  },
  parentNode(node) {
    return node.parent;
  },
  remove(el) {
    if (el && el.parent) {
      el.parent.removeChild(el);
    }
  },

  nextSibling() {},
  createComment() {},
});

export function createApp(rootComponent) {
  return renderer.createApp(rootComponent);
}
