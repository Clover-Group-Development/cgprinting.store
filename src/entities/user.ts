import { UserRole } from "@/enums";
import { Document } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
  role: UserRole;
  identity?: string;
  firstName: string;
  lastName: string;
}

export const schema = new Schema({
  identity: { type: String, required: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: Number, required: true },
});

export const model =
  mongoose.models.user || mongoose.model<IUser>("user", schema);
