type smoothScrollOptionsType = {
  offset?: number;
  timeout?: number;
  target?: Element;
};

type smoothScrollType = (
  from?: number,
  options?: smoothScrollOptionsType
) => Promise<void>;

/**
 * smooth scroll which returns **Promise** object
 *
 * @param from - top value of element starts scrolling
 * @param options - scroll options
 * @property `offset` - y position offset
 * @property `timeout` - scroll timeout for rejecting promise
 * @property `target` - the element to scroll
 * @see https://stackoverflow.com/a/53247994
 * */
const smoothScroll: smoothScrollType = (
  from = 0,
  { offset = 0, timeout = 3000, target = window } = {}
) => {
  const targetPosition = Math.max(
    0,
    Math.min(document.body.scrollHeight - window.innerHeight, from + offset)
  );
  target.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });

  const getCurrentGap = () =>
    Math.abs(
      (target instanceof Window ? target.scrollY : target.scrollTop) -
        targetPosition
    );

  return new Promise((resolve, reject) => {
    const timeoutID = setTimeout(() => {
      reject("scroll timeout!");
      target.removeEventListener("scroll", scrollHandler);
    }, timeout);
    const intervalID = setInterval(() => {
      scrollHandler();
    }, 100);

    function scrollHandler() {
      if (getCurrentGap() > 1) return;
      target.removeEventListener("scroll", scrollHandler);
      clearTimeout(timeoutID);
      clearInterval(intervalID);
      resolve();
    }
    target.addEventListener("scroll", scrollHandler);
  });
};

export default smoothScroll;
