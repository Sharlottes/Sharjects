import { useEffect } from "react";

export default function useScrollEvent(handler: () => void, deps: any[] = []) {
  useEffect(() => {
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [...deps]);
}
