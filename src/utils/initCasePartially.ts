import type { RecordValues as ValueOf } from './types'

export const initCasePartially = <ValueTypeForCases,>() => <
  Enum extends Record<string | number, string | number>,
  Cases extends Partial<Record<ValueOf<Enum>, () => Values>>,
  Values extends ValueTypeForCases | undefined
>(_enum: Enum, cases: Cases, key: ValueOf<Enum>) => cases[key]?.() ?? null as Values | null