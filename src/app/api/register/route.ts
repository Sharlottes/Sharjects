import bcrypt from "bcrypt";
import UserModel from "src/models/User";
import { NextResponse } from "next/server";

// 사용자 이름과 비밀번호에 맞는 유저가 없으면 새로 생성
export async function POST(req: Request) {
  const body = await req.json()!;
  const isEmail = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(body.username);
  const user = isEmail
    ? await UserModel.findOne({ email: body.username })
    : await UserModel.findOne({ username: body.username });
  if (user) {
    return new Response(JSON.stringify({ message: "already registered" }), {
      status: 200,
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(body.password, salt);
    const newUser = new UserModel({
      username: body.username,
      ...(isEmail && { email: body.email }),
      password: hashPass,
    });
    await newUser.save();
    return new Response(JSON.stringify({ message: "success" }), {
      status: 200,
    });
  }
}
