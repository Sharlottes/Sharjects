export const initCasePartially =
  <ValueTypeForCases>() =>
  <
    Enum extends Record<string | number, string | number>,
    Cases extends Partial<Record<RecordValues<Enum>, () => Values>>,
    Values extends ValueTypeForCases | undefined
  >(
    _enum: Enum,
    cases: Cases,
    key: RecordValues<Enum>
  ) =>
    cases[key]?.() ?? (null as Values | null);
