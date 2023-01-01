export function debounce<PT extends Array<any>, RT = void>(
  callback: (...args: PT) => RT,
  duration: number = 100
): (
  ...params: Parameters<typeof callback>
) => ReturnType<typeof callback> | undefined {
  let id: NodeJS.Timeout | undefined;

  return (...params) => {
    if (id) return;
    id = setTimeout(() => (id = undefined), duration);
    return callback(...params);
  };
}
