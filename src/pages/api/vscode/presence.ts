import type { NextApiRequest, NextApiResponse } from "next";
import type { VSCodeStatusData } from "src/@types";

let latestRecord: VSCodeStatusData | undefined;

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    latestRecord = req.body;
    res.end();
  } else {
    res.status(200).json({ item: latestRecord });
  }
};
