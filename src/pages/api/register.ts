import bcrypt from 'bcrypt'
import UserModel from 'models/User'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body
  const user = await UserModel.findOne({ email: body.email })
  if (user) {
    res.status(200).json({ message: 'already registered' })
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(body.password, salt)
  const newUser = new UserModel({ email: body.email, password: hashPass })
  await newUser.save()
  res.status(200).json({ message: 'success' })
}