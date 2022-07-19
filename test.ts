type ValueOf<T> = T[keyof T]

const initCasePartially = <ValueTypeForCases>() => <
  Enum extends Record<string | number, string | number>,
  Cases extends Partial<Record<ValueOf<Enum>, ValueProviders>>,
  ValueProviders extends () => Values,
  Values extends ValueTypeForCases
>(_enum: Enum, cases: Cases, key: ValueOf<Enum>) => cases[key]?.() ?? null as Values | null;

enum SubmitStatus {
  READY,
  DONE,
  FAILED,
}

declare const submitStatus: SubmitStatus

const temp = initCasePartially<string>()

type TempType = { a: "inherit" | "primary" | "secondary" | "success" | "error" };
const obj: TempType = {
  a:
    temp(SubmitStatus, {
      //^?
      [SubmitStatus.DONE]: () => 'success',
      [SubmitStatus.FAILED]: () => 'error',
    }, submitStatus) ?? 'primary'
};

export default () => { };