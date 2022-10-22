import React from "react";

const preventDefault = (ev: Event) => ev.preventDefault();

function usePreventBodyScroll() {
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    if (hidden) document?.addEventListener("wheel", preventDefault, { passive: false });
    else document?.removeEventListener("wheel", preventDefault, false);

    return () => document?.addEventListener("wheel", preventDefault, { passive: false });
  }, [hidden]);

  const disableScroll = React.useCallback(() => setHidden(true), []);
  const enableScroll = React.useCallback(() => setHidden(false), []);

  return { disableScroll, enableScroll };
}

export default usePreventBodyScroll;