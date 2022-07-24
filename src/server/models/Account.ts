import { Schema, model } from 'mongoose'
import type { Document } from 'mongoose'

export interface IAccount {
  userId: string
  password: string
  email?: string
}

export interface IAccountDocument extends IAccount, Document { }

const accountSchema = new Schema<IAccountDocument>(
  {
    userId: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'accounts',
  },
)

export default model<IAccountDocument>('Account', accountSchema)