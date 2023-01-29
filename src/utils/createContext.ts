import React from "react";
import capitalize from "./capitalize";

type Field<Name extends string = string, V = any> = Record<Name, V> &
  Record<`set${Capitalize<Name>}`, (value: V) => void>;
type CombineFields<Fields extends Array<Field>> = Fields extends [
  infer F extends Field,
  ...infer Rest extends Array<Field>
]
  ? F & CombineFields<Rest>
  : {};
export const field = <Name extends string>(name: Name) =>
  (<V>(value?: V) => ({
    [name]: value,
    [`set${capitalize(name)}`]: () => {
      throw new Error("unsubscribed component");
    },
  })) as {
    <V>(value: V): Field<Name, V>;
    <V>(): unknown extends V ? V : Field<Name, V | undefined>;
  };
const createContext = <Fields extends Array<Field>>(...fields: Fields) =>
  React.createContext(
    fields.reduce(
      (acc, field) => ({ ...acc, field }),
      {}
    ) as CombineFields<Fields>
  );

export default createContext;
