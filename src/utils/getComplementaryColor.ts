import { decomposeColor, recomposeColor } from "@mui/material/styles";

export const getComplementaryColor = (color: string) => {
  const decomposed = decomposeColor(color);
  decomposed.values = decomposed.values.map((c, i) =>
    i === 3 ? c : 255 - c
  ) as any;
  return recomposeColor(decomposed);
};
