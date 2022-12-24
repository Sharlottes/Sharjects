import { Schema, model, models, type Document } from "mongoose";

export interface IVars {
  visitors: Record<string, number>;
}

export interface IVarsDocument extends IVars, Document {}

const VarsSchema = new Schema<IVarsDocument>(
  {
    visitors: { type: Object, required: true },
  },
  {
    collection: "Vars",
  }
);

export default models.Vars || model<IVarsDocument>("Vars", VarsSchema);
