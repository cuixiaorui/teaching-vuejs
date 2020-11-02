export function h(type, props, children) {
  return {
    type,
    props,
    children: Array.isArray(children) ? children : children.toString(),
  };
}
