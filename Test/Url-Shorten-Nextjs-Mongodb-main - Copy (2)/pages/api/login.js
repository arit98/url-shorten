import User from "../../models/user.js";
import { connectToDB } from "../../utils/connectMongo.js";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
    const { email } = params;
    // const { email } = await req.json();
    try {
      await connectToDB();
      const user = await User.findOne({ email });
      // console.log("user:",user)
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
      return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to connect to the server" },
        { status: 500 }
      );
    }
  }