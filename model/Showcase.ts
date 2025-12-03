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
    valueShortDesc: { type: String, required: true, trim: true },
    values: [storyShowcaseValue],
  },
  {
    _id: false,
  }
);

const offerShowcase = new mongoose.Schema(
  {
    heading: { type: String, required: true, trim: true },
    tagline: { type: String, required: true, trim: true },
    deadline: { type: Date, required: true },
    image: { type: String, required: true, trim: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    _id: false,
  }
);

const reservationShowcase = new mongoose.Schema(
  {
    cta: { type: String, required: true, trim: true },
    heading: { type: String, required: true, trim: true },
    tagline: { type: String, required: true, trim: true },
    darkImage: { type: String, required: true, trim: true },
    lightImage: { type: String, required: true, trim: true },
  },
  {
    _id: false,
  }
);

const ShowcaseSchema: Schema = new mongoose.Schema(
  {
    shopShowcase,
    storyShowcase,
    offerShowcase,
    reservationShowcase,
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
