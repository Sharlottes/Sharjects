import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler({ query: { endpoint } }: NextApiRequest, res: NextApiResponse) {
    console.log('client requested with ', endpoint)
    const r = await fetch(`https://api.github.com/${(endpoint as string[]).join('/')}`, {
        headers: {
            Authorization: `token ${process.env.GITHUB_REST_PAT}`
        },
    });
    const json = await r.json();
    res.status(r.status).json(json);
}