import { product } from "@/entities";
import { connect } from "@/lib/db";

export async function GET(request: Request) {
  await connect();
  const products = await product.find();
  return Response.json(products);
}
