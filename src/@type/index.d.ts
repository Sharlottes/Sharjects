export type DiriAPI<T> = {
  code: number,
  data: T,
  version: 2
}

export type DiriAPIError = {
  code: number,
  errors: string[],
  message: string,
  version: 2
}

export type DiriAPIBotlist = {
  type: string,
  data: Bot[],
  currentPage: number,
  totalPage: number
}