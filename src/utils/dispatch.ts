type dispatchType = <PT extends Array<any>, RT = void>(callback: (...args: PT) => RT, duration: number) => (key: string, ...params: Parameters<typeof callback>) => ReturnType<typeof callback> | undefined;
export const dispatch: dispatchType = (callback, duration) => {
  let id: Record<string, NodeJS.Timeout | undefined> = {};

  return (key, ...params) => {
    if (!id[key]) {
      id[key] = setTimeout(() => id[key] = undefined, duration);
      return callback(...params);
    }
    return;
  }
}
