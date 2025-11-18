import mongoose, { Document, Schema } from "mongoose";

export interface IBanner extends Document {
  tagline: string;
  heading: string;
  shortDesc: string;
  image: string;
  position: number;
  status: boolean;
}

const BannerSchema: Schema = new mongoose.Schema(
  {
    tagline: { type: String, required: true, trim: true },
    heading: { type: String, required: true, trim: true },
    shortDesc: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    position: { type: Number, required: true, default: 0 },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

BannerSchema.index({ position: 1 });

const Banner =
  mongoose.models.Banner ||
  mongoose.model<IBanner>("Banner", BannerSchema, "banners");

export default Banner;
