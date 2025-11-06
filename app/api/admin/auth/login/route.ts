import dbConnect from "@/config/database";
import { validateRequest } from "@/lib/validate-request";
import { NextRequest } from "next/server";
import z from "zod";

const loginSchema = z.object({
  email: z.email("Valid email is required!").min(1, "Required!"),
  password: z.string().min(1, "Required!"),
});

export async function POST(req: NextRequest) {
  await dbConnect();

  const data = await validateRequest(req, loginSchema);

  return Response.json(data);
}
