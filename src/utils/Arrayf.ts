namespace Arrayf {
  export const padLeft = <T>(array: T[], totalLength: number, fill: T): T[] => {
    return [
      ...Array.from(
        { length: Math.max(0, totalLength - array.length) },
        () => fill
      ),
      ...array,
    ];
  };

  export const padRight = <T>(
    array: T[],
    totalLength: number,
    fill: T
  ): T[] => {
    return [
      ...array,
      ...Array.from(
        { length: Math.max(0, totalLength - array.length) },
        () => fill
      ),
    ];
  };
}

export default Arrayf;
