import VarsModel, { type IVarsDocument } from "src/models/Vars";

function getDataCode() {
  const date = new Date();
  return `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`.toString();
}

export async function POST() {
  const Vars: IVarsDocument = (await VarsModel.findOne()) as IVarsDocument;
  const dateCode = getDataCode();
  const { [dateCode]: current, ...others } = Vars.visitors;
  Vars.set({ visitors: { ...others, [dateCode]: (current || 0) + 1 } });
  await Vars.save();
}

export async function GET() {
  const Vars: IVarsDocument = (await VarsModel.findOne()) as IVarsDocument;
  return new Response(JSON.stringify(Vars.visitors), { status: 200 });
}
