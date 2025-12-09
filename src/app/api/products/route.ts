import { NextRequest, NextResponse } from "next/server";
import { model } from "@/entities";
import { connect } from "@/lib/db";

export async function GET(request: NextRequest) {
  await connect();
  const products = await model.find();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  await connect();
  const product = await request.json();
  await model.insertOne(product);
  return new NextResponse(product, { status: 201 });
}
