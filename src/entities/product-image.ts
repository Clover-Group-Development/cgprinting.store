import { Schema } from "mongoose";

export interface IProductImage {
  id: string;
  displayName: string;
}

export const schema = new Schema({
  id: { type: String, required: true },
  displayName: { type: String, required: true },
});
