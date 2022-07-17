export const initCasePartially = <ValueTypeForCases>() => <
  Enum extends Record<string | number, string | number>,
  Cases extends Partial<Record<Enum[keyof Enum], ValueTypeForCases>>,
  >(_enum: Enum, cases: Cases) => cases as Partial<Record<Enum[keyof Enum], Cases[keyof Cases]>>;
