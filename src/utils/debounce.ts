type debounceType = <PT extends Array<any>, RT = void>(
  callback: (...args: PT) => RT,
  duration?: number
) => (
  ...params: Parameters<typeof callback>
) => ReturnType<typeof callback> | undefined;

export const debounce: debounceType = (callback, duration = 100) => {
  let id: NodeJS.Timeout | undefined;

  return (...params) => {
    if (id) {
      clearTimeout(id);
      id = setTimeout(() => (id = undefined), duration);
    } else {
      id = setTimeout(() => (id = undefined), duration);
      return callback(...params);
    }
  };
};
