import { Schema, Document, Model, QueryWithHelpers, HydratedDocument, model } from 'mongoose';

type IAccountQuery = QueryWithHelpers<any, HydratedDocument<IAccount, {}, {}>, {}, IAccount>;

export interface IAccount extends Document {
  id: string;
  password: string;
}

interface IAccountModel extends Model<IAccount> {
  findAll: () => IAccountQuery;
  findById: (id: string) => IAccountQuery;
  deleteById: (id: string) => IAccountQuery;
}

const accountSchema = new Schema<IAccount>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'accounts'
  }
);


accountSchema.statics.findAll = function () {
  return this.find();
}

accountSchema.statics.findById = function (id: string) {
  return this.findOneAndUpdate({ id });
}

accountSchema.statics.deleteById = function (id: string) {
  return this.remove({ id });
}

export default model<IAccount, IAccountModel>('Account', accountSchema);