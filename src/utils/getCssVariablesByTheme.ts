import type { Theme } from "@mui/material/styles";

const themeProps = [
  "palette",
  "breakpoints",
  "direction",
  "shape",
  "shadows",
  "typography",
  "transitions",
  "zIndex",
] as const;
type VariableMap = Pick<
  CSSVariableMaps<Pick<Theme, (typeof themeProps)[number]>, []>,
  (typeof themeProps)[number]
>;

// yey hack time
export function getCssVariablesByTheme(theme: Theme): {
  ThemeVariables: VariableMap;
  css: string;
} {
  const ThemeVariables: any = {};

  const css = themeProps
    .map((key) => {
      ThemeVariables[key] ??= {};
      return tokensToCss(theme[key], "--theme-" + key, ThemeVariables[key]);
    })
    .join("\n");
  return { ThemeVariables, css };
}

function tokensToCss(
  rootObject: unknown,
  base: string,
  ThemeVariables: Record<string, {}>
): string {
  function repeat(
    object: Record<PropertyKey, unknown> = {},
    base = `-`,
    baseStack: string[] = []
  ): string {
    return Object.entries(object).reduce((css, [key, value]) => {
      if (!value || typeof value === "function") {
        return css;
      }

      const newBase = base + `-${key}`;
      if (typeof value == "object") {
        return (
          css +
          repeat(value as Record<PropertyKey, unknown>, newBase, [
            ...baseStack,
            key,
          ]) +
          "\n"
        );
      }

      if (baseStack.length == 0) {
        ThemeVariables[key] = `var(${newBase})`;
      }

      Object.assign(
        ThemeVariables,
        baseStack.reduce((currentObject: any, objKey: string, i) => {
          currentObject[objKey] ??= {};
          if (i != baseStack.length - 1) {
            return currentObject[objKey];
          }
          if (currentObject[objKey]) {
            Object.assign(currentObject[objKey], { [key]: `var(${newBase})` });
          }
          return currentObject;
        }, ThemeVariables)
      );

      return css + newBase + ": " + value + ";\n";
    }, "");
  }

  return repeat(rootObject as Record<PropertyKey, unknown>, base);
}
