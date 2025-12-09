import { Document } from "mongodb";
import mongoose, { Schema } from "mongoose";
import { IProductImage, schema as imageSchema } from "./product-image";

export interface IProduct extends Document {
  displayName: string;
  price: number;
  images: Array<IProductImage>;
}

const schema: Schema = new Schema(
  {
    displayName: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    images: [imageSchema],
  },
  { timestamps: true },
);

export const model =
  mongoose.models.product || mongoose.model<IProduct>("product", schema);
