namespace Mathf {
  export const lerp = (from: number, to: number, prog: number) =>
    from + (to - from) * prog;

  export const clamp = (value: number, max = 1, min = 0) =>
    Math.max(min, Math.min(max, value));
}

export default Mathf;
