export type RecordValues<R extends Record<any, any>> = R[keyof R]
export type NonNullableKeys<T, K extends keyof T> = Omit<T, K> & {
  [_K in K]: NonNullable<T[_K]>
}

declare module 'react' {
  interface HasChildren<T = ReactElement> {
    children: T
  }
  type PureFC<P = {}> = (props: P, context?: any) => ReactElement<any, any> | null
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly PORT: number
    }
  }
}
