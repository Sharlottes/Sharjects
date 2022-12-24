export const toFit = (runner: (...params: any) => any) => {
  let tick = false;

  return () => {
    if (tick) return;
    tick = true;
    return requestAnimationFrame(() => {
      tick = false;
      return runner();
    });
  };
};
