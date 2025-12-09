import { Document } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface IProduct extends Document {
  displayName: string;
  price: number;
}

const schema: Schema = new Schema(
  {
    displayName: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export const product =
  mongoose.models.product || mongoose.model<IProduct>("product", schema);
