import React from "react";

/**
 * fetcher 함수를 받아 suspense의 fetch로 매핑합니다.
 * @param fetcher 데이터 getter 함수
 * @returns suspense fetcher 함수
 */
const mapFetcher = function <T>(fetcher: T | Promise<T>): () => T | undefined {
  if (fetcher instanceof Promise) {
    let data: T | null | undefined = null;
    const promise = fetcher.then(
      (d) => (data = d),
      (err) => {
        console.log("failed to get data: ", err);
        data = undefined;
      }
    );
    return () => {
      if (data === null) throw promise;
      return data;
    };
  } else {
    return () => fetcher;
  }
};

type ChildrenComponentProps<
  PN extends keyof React.ComponentProps<T>,
  T extends React.ComponentType<any>
> = {
  fetchedPropName: keyof React.ComponentProps<T>;
  Component: T;
} & Omit<React.ComponentProps<T>, PN>;

export interface FSWProps<DT> {
  fetcher: () => DT | Promise<DT>;
  fallback?: JSX.Element;
}

const FetchSuspenseWrapper = <
  PN extends keyof React.ComponentProps<T>,
  T extends React.ComponentType<any>,
  DT
>({
  fetcher: fetch,
  fallback = <>loading...</>,
  ...others
}: FSWProps<DT> & ChildrenComponentProps<PN, T>) => {
  const [data, setData] = React.useState<DT>();
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    startTransition(() => {
      setData(mapFetcher(fetch()));
    });
  }, []);

  return (
    <>
      {isPending ? " Loading..." : null}
      <React.Suspense fallback={fallback}>
        {data && <ChildrenWithFetcher {...others} data={data} />}
      </React.Suspense>
    </>
  );
};

interface ChildrenWithFetcherProps<DT> {
  data: DT;
}

const ChildrenWithFetcher = <
  PN extends keyof React.ComponentProps<T>,
  T extends React.ComponentType<any>,
  DT
>({
  data,
  Component,
  fetchedPropName,
  ...others
}: ChildrenWithFetcherProps<DT> & ChildrenComponentProps<PN, T>) => {
  return (
    <Component
      {...({ [fetchedPropName]: data, ...others } as React.ComponentProps<T>)}
    />
  );
};

export default FetchSuspenseWrapper;
