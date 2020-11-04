// 响应式的支持
import { reactive, watchEffect } from "./reactivity/index.js";
import { h } from "./h.js";
window.h = h;

const App = {
  // template -> render
  render(content) {
    // reset
    // 2. 使用 diff 算法来优化整个更新流程
    // 1. 使用 vnode 来表示数据
    // 3. 把初始化的过程给抽象出来
    // const rootContainer = document.createElement("div");

    // const div = document.createElement("div");
    // div.innerText = content.state.title;

    // const countDiv = document.createElement("div");
    // countDiv.innerText = content.state.count;
    // // 按钮
    // const btn = document.createElement("button");
    // btn.innerText = "click";
    // btn.addEventListener("click", content.state.onClick);

    // rootContainer.append(div);
    // rootContainer.append(btn);
    // rootContainer.append(countDiv);

    // return rootContainer;

    return h("div", { testId: content.state.testId }, [
      h("div", null, content.state.title),
      h("div", null, content.state.count),
      h(
        "button",
        {
          onClick: content.state.onClick,
        },
        "click"
      ),
    ]);

    // return h("div", null, content.state2.content);
    // return h("div", null, content.state2.content);
  },

  setup() {
    const state = reactive({
      title: "mini-vue",
      count: 0,
      testId: "heihei",
      onClick() {
        state.testId = "hahah";
        state.count++;
        console.log(state);
      },
    });

    window.state1 = reactive({
      content: "hello",
    });

    window.state2 = reactive({
      content: [h("p", null, "123")],
    });

    return {
      state,
      state1,
      state2,
    };
  },
};

// App.render(App.setup());

// vue3 api

function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const setupResult = rootComponent.setup();
      let isMounted = false;
      let oldSubTree;

      watchEffect(() => {
        if (!isMounted) {
          isMounted = true;
          const subTree = rootComponent.render(setupResult);
          oldSubTree = subTree;
          mountElement(subTree, rootContainer);
          // 添加到 rootContainer 内
          // rootContainer.append(renderResult);
        } else {
          // update
          const subTree = rootComponent.render(setupResult);
          // console.log("oldSubTree", oldSubTree);
          // console.log("newSubTree", subTree);
          diff(oldSubTree, subTree);
          oldSubTree = subTree;
        }
      });
    },
  };
}

function diff(v1, v2) {
  // 1. 如果 tag 都不一样的话，直接替换
  // 2. 如果 tag 一样的话
  //    1. 要检测 props 哪些有变化
  //    2. 要检测 children  -》 特别复杂的
  v2.el = v1.el;
  const { props: oldProps, el, children: oldChildren = [] } = v1;
  const { props: newProps, children: newChildren = [] } = v2;
  if (v1.tag !== v2.tag) {
    v1.replaceWith(createElement(v2.tag));
  } else {
    // 对比 props
    // 1. 新的节点不等于老节点的值 -> 直接赋值
    // 2. 把老节点里面新节点不存在的 key 都删除掉
    if (newProps) {
      Object.keys(newProps).forEach((key) => {
        if (newProps[key] !== oldProps[key]) {
          patchProp(el, key, oldProps[key], newProps[key]);
        }
      });

      // 遍历老节点 -》 新节点里面没有的话，那么都删除掉
      Object.keys(oldProps).forEach((key) => {
        if (!newProps[key]) {
          patchProp(el, key, oldProps[key], null);
        }
      });
    }
    // 对比 children

    // newChildren -> string
    // oldChildren -> string   oldChildren -> array

    // newChildren -> array
    // oldChildren -> string   oldChildren -> array
    if (typeof newChildren === "string") {
      if (typeof oldChildren === "string") {
        if (newChildren !== oldChildren) {
          setText(el, newChildren);
        }
      } else if (Array.isArray(oldChildren)) {
        v1.el.textContent = newChildren;
      }
    } else if (Array.isArray(newChildren)) {
      if (typeof oldChildren === "string") {
        // 清空之前的数据
        n1.el.innerHTML = "";
        // 把所有的 children mount 出来
        newChildren.forEach((vnode) => {
          mountElement(vnode, el);
        });
      } else if (Array.isArray(oldChildren)) {
        // a, b, c, d, e -> new
        // a1,b1,c1,d1 -> old
        // 如果 new 的多的话，那么创建一个新的

        // a, b, c -> new
        // a1,b1,c1,d1 -> old
        // 如果 old 的多的话，那么把多的都删除掉
        const length = Math.min(newChildren.length, oldChildren.length);
        for (let i = 0; i < length; i++) {
          const oldVnode = oldChildren[i];
          const newVnode = newChildren[i];
          // 可以十分复杂
          diff(oldVnode, newVnode);
        }

        if (oldChildren.length > length) {
          // 说明老的节点多
          // 都删除掉
          for (let i = length; i < oldChildren.length; i++) {
            remove(oldChildren[i], el);
          }
        } else if (newChildren.length > length) {
          // 说明new 的节点多
          // 那么需要创建对应的节点
          for (let i = length; i < newChildren.length; i++) {
            mountElement(newChildren[i], el);
          }
        }
      }
    }
  }
}

function createText(text) {
  return new Text(text);
}

function remove(el, parent) {
  parent.remove(el);
}

function createElement(type) {
  return document.createElement(type);
}

function setText(el, text) {
  el.textContent = text;
}

function insert(el, parent) {
  parent.append(el);
}

function patchProp(el, key, prevValue, nextValue) {
  // onClick
  // 1. 如果前面2个值是 on 的话
  // 2. 就认为它是一个事件
  // 3. on 后面的就是对应的事件名
  if (key.startsWith("on")) {
    const eventName = key.slice(2).toLocaleLowerCase();
    el.addEventListener(eventName, nextValue);
  } else {
    if (nextValue === null) {
      el.removeAttribute(key, nextValue);
    } else {
      el.setAttribute(key, nextValue);
    }
  }
}

function mountElement(vnode, container) {
  // 渲染成真实的 dom 节点

  const el = (vnode.el = createElement(vnode.type));
  console.log(vnode);

  // 处理 props
  if (vnode.props) {
    for (const key in vnode.props) {
      const val = vnode.props[key];
      patchProp(vnode.el, key, null, val);
    }
  }

  // 要处理 children
  if (Array.isArray(vnode.children)) {
    vnode.children.forEach((v) => {
      mountElement(v, el);
    });
  } else {
    const textNode = document.createTextNode(vnode.children);
    console.log(textNode);
    el.append(textNode);
  }

  insert(el, container);
}

createApp(App).mount(document.querySelector("#app"));
