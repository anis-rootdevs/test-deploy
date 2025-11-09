import dbConnect from "@/config/database";
import { NextRequest, NextResponse } from "next/server";

type NextRouteHandler = (req: NextRequest) => Promise<NextResponse>;

export const asyncHandler = (func: NextRouteHandler): NextRouteHandler => {
  return async (req: NextRequest) => {
    try {
      // Optimized DB Connect
      await dbConnect();
      return await func(req);
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        {
          status: false,
          message: "Something went wrong!",
        },
        { status: 500 }
      );
    }
  };
};
