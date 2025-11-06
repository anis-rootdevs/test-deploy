import dbConnect from "@/config/database";
import User from "@/model/User";
import bcrypt from "bcrypt";

export async function GET() {
  await dbConnect();

  const user = await User.create({
    name: "Admin",
    email: "admin@demo.com",
    password: await bcrypt.hash("123456", 10),
    role: "admin",
  });

  return Response.json(user);
}
