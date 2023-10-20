export const throttle = <PT extends Array<any>, RT = void>(
  callback: (...args: PT) => RT,
  duration = 100,
  force = (..._: PT) => false
): ((...args: PT) => RT | undefined) => {
  let id: NodeJS.Timeout | undefined;

  return (...params) => {
    if (id) {
      if (force(...params)) clearTimeout(id);
      else return;
    }
    id = setTimeout(() => (id = undefined), duration);
    return callback(...params);
  };
};
