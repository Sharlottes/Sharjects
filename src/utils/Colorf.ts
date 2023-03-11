import Mathf from "./Mathf";
import { decomposeColor, recomposeColor } from "@mui/material/styles";

namespace Colorf {
  export const colorLerp = (from: string, to: string, prog: number) => {
    const [fr, fg, fb, fa] = decomposeColor(from).values;
    const [tr, tg, tb, ta] = decomposeColor(to).values;
    return (
      "#" +
      ((~~Mathf.lerp(fr, tr, prog)).toString(16).padStart(2, "0") +
        (~~Mathf.lerp(fg, tg, prog)).toString(16).padStart(2, "0") +
        (~~Mathf.lerp(fb, tb, prog)).toString(16).padStart(2, "0") +
        (~~Mathf.lerp(fa ?? 0, ta ?? 0, prog)).toString(16).padStart(2, "f"))
    );
  };

  export const getComplementaryColor = (color: string) => {
    const decomposed = decomposeColor(color);
    decomposed.values = decomposed.values.map((c, i) =>
      i === 3 ? c : 255 - c
    ) as any;
    return recomposeColor(decomposed);
  };
}

export default Colorf;
