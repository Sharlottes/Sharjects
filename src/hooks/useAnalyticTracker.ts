import { pageview } from "src/lib/ga";
import useRouterChange from "./useRouterChange";

const useAnalyticTracker = () => {
  useRouterChange((url: any) => {
    pageview(url);
    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "this is just for": "enabling post method",
      }),
    });
  });
};

export default useAnalyticTracker;
