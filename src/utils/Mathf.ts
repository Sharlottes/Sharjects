namespace Mathf {
  export const lerp = (from: number, to: number, prog: number) =>
    from + (to - from) * prog;
}

export default Mathf;
