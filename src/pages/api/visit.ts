import { type NextApiRequest, type NextApiResponse } from "next"
import VarsModel, { type IVarsDocument } from 'src/models/Vars'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const date = new Date();
    const dateCode = (req.query.dateCode ?? `${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`).toString();
    const Vars: IVarsDocument = await VarsModel.findOne() as IVarsDocument;
    const { [dateCode]: current, ...others } = Vars.visitors;
    if(req.method === 'POST') {
        Vars.set({ visitors: { ...others, [dateCode]: (current || 0) + 1  } });
        await Vars.save();
    }
    res.status(200).json(Vars.visitors);
}