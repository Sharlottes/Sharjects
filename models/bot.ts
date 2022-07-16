import { Schema, Document, Model, QueryWithHelpers, HydratedDocument, model } from 'mongoose';

type IBotQuery = QueryWithHelpers<any, HydratedDocument<IBot, {}, {}>, {}, IBot>;

interface IBot extends Document {
  name: string;
  id: string;
}

interface IBotModel extends Model<IBot> {
  findAll: () => IBotQuery;
  findById: (id: string) => IBotQuery;
  deleteById: (id: string) => IBotQuery;
}

const botSchema = new Schema<IBot>(
  {
    name: { type: String, required: true },
    id: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'bots'
  }
);


botSchema.statics.findAll = function () {
  return this.find();
}

botSchema.statics.findById = function (id: string) {
  return this.findOneAndUpdate({ id });
}

botSchema.statics.deleteById = function (id: string) {
  return this.remove({ id });
}

export default model<IBot, IBotModel>('Bot', botSchema);