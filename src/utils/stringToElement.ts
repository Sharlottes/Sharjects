export default function stringToElement<T = Element>(
  string: string,
  regexp: RegExp,
  replacer: (string: string, index: number) => T,
  elser: (string: string, index: number) => T
) {
  let output: T[] = [];
  let lastIndex = 0;
  let idx = 0;
  while (true) {
    const result = regexp.exec(string);
    if (!result) break;
    const { 0: value, index: matchedIndex } = result;

    if (value === "") regexp.lastIndex++;
    if (matchedIndex !== lastIndex) {
      output.push(elser(string.substring(lastIndex, matchedIndex), idx));
      idx++;
    }
    output.push(replacer(value, idx));
    idx++;

    lastIndex = matchedIndex + value.length;

    if (!regexp.global) break;
  }

  if (lastIndex < string.length) {
    output.push(elser(string.substring(lastIndex), idx + 1));
  }

  return output;
}
