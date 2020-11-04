export function h(type, props, children = []) {
  return {
    type,
    props,
    children: typeof children === "object" ? children : children.toString(),
  };
}
