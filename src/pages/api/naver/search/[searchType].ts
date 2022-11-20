import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler({ query: { searchType, word } }: NextApiRequest, res: NextApiResponse) {
  const r = await fetch(`https://openapi.naver.com/v1/search/${searchType?.toString()}.json?query=${word}&display=1`, {
    headers: {
      "X-Naver-Client-Id": process.env.XNaverClientId,
      "X-Naver-Client-Secret": process.env.XNaverClientSecret,
    },
  })
  const json = await r.json();
  res.status(r.status).json(json);
}