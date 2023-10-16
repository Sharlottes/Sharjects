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
  { offset = 0, timeout = 5000, target = window } = {}
) => {
  const targetPosition = from + offset;
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
    if (getCurrentGap() > 1) {
      resolve();
      return;
    }

    const failed = setTimeout(() => {
      reject("scroll timeout!");
      target.removeEventListener("scroll", scrollHandler);
    }, timeout);

    const scrollHandler = () => {
      console.log(getCurrentGap());
      if (getCurrentGap() > 1) return;
      target.removeEventListener("scroll", scrollHandler);
      clearTimeout(failed);
      resolve();
    };
    target.addEventListener("scroll", scrollHandler);
  });
};

export default smoothScroll;
