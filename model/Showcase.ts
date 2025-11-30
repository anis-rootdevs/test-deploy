import mongoose, { Document, Schema } from "mongoose";

export interface IShopShowcase extends Document {
  heading: string;
  shortDesc: string;
  coffeeLovers: number;
  tagline: string;
  imageOne: string;
  imageTwo: string;
  imageThree: string;
}

export interface IShowcase extends Document {
  shopShowcase: IShopShowcase;
}

const shopShowcase = new mongoose.Schema(
  {
    heading: { type: String, required: true, trim: true },
    shortDesc: { type: String, required: true, trim: true },
    coffeeLovers: { type: Number, default: 100 },
    tagline: { type: String, required: true, trim: true },
    imageOne: { type: String, required: true, trim: true },
    imageTwo: { type: String, required: true, trim: true },
    imageThree: { type: String, required: true, trim: true },
  },
  {
    _id: false,
  }
);

const ShowcaseSchema: Schema = new mongoose.Schema(
  {
    shopShowcase: shopShowcase,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Showcase =
  mongoose.models.Showcase ||
  mongoose.model<IShowcase>("Showcase", ShowcaseSchema, "showcases");

export default Showcase;
