import { NextRequest, NextResponse } from "next/server";
import { model } from "@/entities/user";
import { connect } from "@/lib/db";

export async function GET() {
  await connect();
  const users = await model.find();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  await connect();
  const user = await request.json();
  await model.insertOne(user);
  return new NextResponse(user, { status: 201 });
}
