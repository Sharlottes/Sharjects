export const isEmail = (string: string) =>
  /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(string);
