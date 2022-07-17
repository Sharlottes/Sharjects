import type { RecordValues } from './types'

export const initCasePartially = <ValueTypeForCases>() => <
  Enum extends Record<string | number, string | number>,
  Cases extends Partial<Record<RecordValues<Enum>, ValueTypeForCases>>,
  >(_enum: Enum, cases: Cases) => cases as Partial<Record<RecordValues<Enum>, RecordValues<Cases>>>;
