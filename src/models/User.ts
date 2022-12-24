import { Schema, model, models, type Document } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  email?: string;
}

export interface IUserDocument extends IUser, Document {}

const UserSchema = new Schema<IUserDocument>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: false },
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

export default models.User || model<IUserDocument>("User", UserSchema);
