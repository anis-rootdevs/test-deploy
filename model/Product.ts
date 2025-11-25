import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  shortDesc: string;
  price: number;
  image: string;
  status: boolean;
  category: Schema.Types.ObjectId;
  mostLoved: boolean;
  featured: boolean;
}

const ProductSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    shortDesc: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    status: { type: Boolean, default: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    mostLoved: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ProductSchema.index({ category: 1 });

const Product =
  mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema, "products");

export default Product;
