import mongoose, { Document, Schema } from "mongoose";

export interface IBanner extends Document {
  tagline: string;
  heading: string;
  shortDesc: string;
  image: string;
}

const BannerSchema: Schema = new mongoose.Schema(
  {
    tagline: { type: String, required: true },
    heading: { type: String, required: true },
    shortDesc: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Banner =
  mongoose.models.Banner ||
  mongoose.model<IBanner>("Banner", BannerSchema, "banners");

export default Banner;
