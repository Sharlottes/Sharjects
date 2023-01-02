type throttleType = <PT extends Array<any>, RT = void>(
  callback: (...args: PT) => RT,
  duration?: number
) => (
  ...params: Parameters<typeof callback>
) => ReturnType<typeof callback> | undefined;

export const throttle: throttleType = (callback, duration = 100) => {
  let id: NodeJS.Timeout | undefined;

  return (...params) => {
    if (id) return;
    id = setTimeout(() => (id = undefined), duration);
    return callback(...params);
  };
};
