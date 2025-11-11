import { ROLE } from "@/config/constant";
import { asyncHandler } from "@/lib/async-handler";
import { apiResponse, generateSignature } from "@/lib/utils";
import { adminLoginSchema } from "@/lib/validation-schema";
import User from "@/model/User";
import bcrypt from "bcrypt";
import z from "zod";

export const POST = asyncHandler(
  adminLoginSchema,
  async (_, data: z.infer<typeof adminLoginSchema>) => {
    const { email, password } = data;

    const admin = await User.findOne({ email: email });
    if (!admin) return apiResponse(false, 401, "Invalid Credentials!");

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return apiResponse(false, 401, "Invalid Credentials!");
    }

    const token = generateSignature(
      { email: admin.email, role: ROLE.ADMIN },
      30 * 24 * 60 * 60
    );

    return apiResponse(true, 200, "Admin login done successfully!", { token });
  }
);
