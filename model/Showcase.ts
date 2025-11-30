import { IShowcase } from "@/lib/types";
import mongoose, { Schema } from "mongoose";

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

const storyShowcaseValue = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  shortDesc: { type: String, required: true, trim: true },
  icon: { type: String, required: true, trim: true },
});

const storyShowcase = new mongoose.Schema(
  {
    heading: { type: String, required: true, trim: true },
    shortDesc: { type: String, required: true, trim: true },
    story: { type: String, required: true, trim: true },
    tagline: { type: String, required: true, trim: true },
    imageOne: { type: String, required: true, trim: true },
    imageTwo: { type: String, required: true, trim: true },
    imageThree: { type: String, required: true, trim: true },
    values: [storyShowcaseValue],
  },
  {
    _id: false,
  }
);

const ShowcaseSchema: Schema = new mongoose.Schema(
  {
    shopShowcase: shopShowcase,
    storyShowcase: storyShowcase,
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
