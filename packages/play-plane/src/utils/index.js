// 矩形碰撞检测
export function hitTestObject(objA, objB) {
  return (
    objA.x + objA.width >= objB.x &&
    objB.x + objB.width >= objA.x &&
    objA.y + objA.height >= objB.y &&
    objB.y + objB.height >= objA.y
  );
}
