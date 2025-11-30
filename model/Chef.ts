import mongoose, { Document, Schema } from "mongoose";

export interface IChef extends Document {
  image: string;
  name: string;
  tagline: string;
  position: number;
  status: boolean;
  gender: "male" | "female" | "other";
  dialCode: string;
  phone: string;
}

const ChefSchema: Schema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    tagline: { type: String, required: true, trim: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    dialCode: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    position: { type: Number, required: true, default: 0 },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ChefSchema.index({ position: 1 });

const Chef =
  mongoose.models.Chef || mongoose.model<IChef>("Chef", ChefSchema, "chefs");

export default Chef;
