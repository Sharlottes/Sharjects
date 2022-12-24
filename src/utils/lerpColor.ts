import { decomposeColor, recomposeColor } from "@mui/material/styles";
import Mathf from "./Mathf";

/**
 * lerp two color with given progress
 * @param from hex color to change from
 * @param to hex color to change to
 * @param prog progress 0~1 float number
 * @returns lerp-ed color
 */
export const lerpColor = (from: string, to: string, prog: number) => {
  const fromColor = decomposeColor(from);
  const toColor = decomposeColor(to);
  fromColor.values = fromColor.values.map((c, i) =>
    Mathf.lerp(c, toColor.values[i], prog)
  ) as any;
  return recomposeColor(fromColor);
};
