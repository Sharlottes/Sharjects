import type { NextApiRequest, NextApiResponse } from "next";
let latestRecord: VSCodeStatusData | undefined;
export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    latestRecord = req.body;
  } else {
    res.status(200).json({ item: latestRecord });
  }
};
