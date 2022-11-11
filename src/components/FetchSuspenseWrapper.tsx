import React, { startTransition } from 'react'

/**
 * fetcher 함수를 받아 suspense가 수용할 데이터로 매핑합니다.
 * @param fetcher 데이터를 가져올 getter 함수
 * @returns 
 */
const mapFetcher = function <T>(fetcher: T | Promise<T>): () => T {
  if (fetcher instanceof Promise) {
    let data: T | null = null
    const promise = fetcher.then(d => data = d, err => console.log('failed to get data: ', err));
    return () => {
      if (data) return data;
      throw promise;
    }
  } else {
    return () => fetcher
  }
}

export type FSWProps<PN extends keyof React.ComponentProps<T>, T extends React.ComponentType<any>, DT> =
  {
    fetcher: () => DT | Promise<DT>
    fallback?: JSX.Element
    fetchedPropName: keyof React.ComponentProps<T>
    Component: T
  } & Omit<React.ComponentProps<T>, PN>

const FetchSuspenseWrapper = <PN extends keyof React.ComponentProps<T>, T extends React.ComponentType<any>, DT>({
  fetcher: fetch,
  Component,
  fetchedPropName,
  fallback = <>loading...</>,
  ...others
}: FSWProps<PN, T, DT>) => {
  const fetcher = mapFetcher(fetch());

  return (
    <React.Suspense fallback={fallback}>
      <ChildrenWithFetcher {...{ fetcher, fetchedPropName, Component, ...others }} />
    </React.Suspense>
  )
}

type ChildrenWithFetcherProps<PN extends keyof React.ComponentProps<T>, T extends React.ComponentType<any>, DT> = {
  fetcher: () => DT
  fetchedPropName: keyof React.ComponentProps<T>
  Component: T
} & Omit<React.ComponentProps<T>, PN>

const ChildrenWithFetcher = <PN extends keyof React.ComponentProps<T>, T extends React.ComponentType<any>, DT>({
  fetcher,
  Component,
  fetchedPropName,
  ...others
}: ChildrenWithFetcherProps<PN, T, DT>) => {
  const data = fetcher();
  return <Component {...{ [fetchedPropName]: data, ...others } as React.ComponentProps<T>} />
}

export default FetchSuspenseWrapper;