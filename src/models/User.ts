import { Schema, model } from 'mongoose'
import type { Document } from 'mongoose'

export interface IUser {
  userId: string
  password: string
  email?: string
}

export interface IUserDocument extends IUser, Document { }

const UserSchema = new Schema<IUserDocument>(
  {
    userId: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'Users',
  },
)

export default model<IUserDocument>('User', UserSchema)