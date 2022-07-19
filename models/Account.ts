import { Schema, Document, Model, QueryWithHelpers, HydratedDocument, model } from 'mongoose';

type IAccountQuery = QueryWithHelpers<any, HydratedDocument<IAccount, {}, {}>, {}, IAccount>;

export interface IAccount {
  userId: string;
  password: string;
  email: string;
}

interface IAccountDocument extends IAccount, Document { }

interface IAccountModel extends Model<IAccountDocument> {
  findAll: () => IAccountQuery;
  findById: (userId: string) => IAccountQuery;
  deleteById: (userId: string) => IAccountQuery;
}

const accountSchema = new Schema<IAccountDocument>(
  {
    userId: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    statics: {
      findAll() {
        return this.find();
      },
      findById(userId: string) {
        return this.findOneAndUpdate({ userId });
      },
      deleteById(userId: string) {
        return this.remove({ userId });
      },
    },
    timestamps: true,
    collection: 'accounts',
  }
);

export default model<IAccountDocument, IAccountModel>('Account', accountSchema);