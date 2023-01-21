import type { NextApiRequest, NextApiResponse } from "next";
import type { VSCodeStatusData } from "src/@types";

let latestRecord: VSCodeStatusData | undefined;

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log("아무튼 오긴 옴\n", req.body);
    latestRecord = req.body;
    res.status(200).json({ successed: true });
  } else {
    res.status(200).json({ item: latestRecord });
  }
};
