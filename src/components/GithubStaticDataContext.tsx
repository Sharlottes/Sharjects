import React from 'react'
import { getOwnDomain } from 'src/utils/getOwnDomain';

interface StaticDataContextI {
  getData: <T extends object>(data: string, endpoint?: string, queries?: string[]) => T | Promise<T>,
}

const StaticDataContext = React.createContext<StaticDataContextI>({ getData: () => new Promise((_, rej) => rej('not subscribed component!')) });

const fetchData = (endpoint: string, queries: string[] = []) =>
  fetch(
    (endpoint.startsWith('http')
      ? endpoint
      : `${getOwnDomain()}/api/github/${endpoint}`
    )
    + queries.join('&')
  ).then(res => res.json())

/**
 * Github API의 데이터 fetch를 절약하기 위한 Context입니다.
 * 
 * 1. getData('data name')를 하면
 *    2. 내부에서 캐시된 데이터가 있는지 확인하고
 *    3. 있으면 반환하되 없으면 fetch해서 내보내주고 캐시하기
 */
const caches: Map<string, any> = new Map();
const GithubStaticDataContext: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const getData = <DT extends object>(dataName: string, endpoint: string = dataName, queries: string[] = []): DT | Promise<DT> => {
    if (caches.has(dataName)) return caches.get(dataName);
    else {
      const promise = fetchData(endpoint, queries).then<DT>(json => {
        caches.set(dataName, json);
        return json;
      })
      caches.set(dataName, promise);
      return promise;
    };
  }

  return (
    <StaticDataContext.Provider value={{ getData }}>
      {children}
    </StaticDataContext.Provider>
  )
}
export default GithubStaticDataContext

export const useGithubData = () => {
  return React.useContext<StaticDataContextI>(StaticDataContext);
}