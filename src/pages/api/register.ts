import bcrypt from "bcrypt";
import UserModel from "src/models/User";
import type { NextApiRequest, NextApiResponse } from "next";
import { isEmail } from "src/utils/isEmail";

// 사용자 이름과 비밀번호에 맞는 유저가 없으면 새로 생성
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  const user = isEmail(body.username)
    ? await UserModel.findOne({ email: body.username })
    : await UserModel.findOne({ username: body.username });
  if (user) {
    res.status(200).json({ message: "already registered" });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(body.password, salt);
    const newUser = new UserModel({
      username: body.username,
      ...(isEmail(body.username) && { email: body.email }),
      password: hashPass,
    });
    await newUser.save();
    res.status(200).json({ message: "success" });
  }
}
