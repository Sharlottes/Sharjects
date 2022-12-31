export function debounce<PT extends Array<any>, RT = void>(
  callback: (...args: PT) => RT,
  duration: number
): (
  key: string,
  ...params: Parameters<typeof callback>
) => ReturnType<typeof callback> | undefined;

export function debounce<PT extends Array<any>, RT = void>(
  callback: (...args: PT) => RT,
  duration: number,
  singleDebounce: true
): (
  ...params: Parameters<typeof callback>
) => ReturnType<typeof callback> | undefined;

export function debounce<PT extends Array<any>, RT = void>(
  callback: (...args: PT) => RT,
  duration: number,
  singleDebounce?: true
): (
  key?: string,
  ...params: Parameters<typeof callback>
) => ReturnType<typeof callback> | undefined {
  let id: Record<string, NodeJS.Timeout | undefined> = {};

  return (key = singleDebounce ? "single" : undefined, ...params) => {
    if (!key) throw new Error("multi debounce key should be given!");
    if (id[key]) return;
    id[key] = setTimeout(() => (id[key] = undefined), duration);
    return callback(...params);
  };
}
