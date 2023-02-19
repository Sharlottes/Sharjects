import React from "react";
import { useRouter } from "next/router";

const useRouterChange = (
  callback: (url: any) => void,
  deps: React.DependencyList = []
) => {
  const router = useRouter();

  React.useEffect(() => {
    router.events.on("routeChangeComplete", callback);
    return () => {
      router.events.off("routeChangeComplete", callback);
    };
  }, [router.events, callback, ...deps]);
};
export default useRouterChange;
