import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  status: boolean;
}

const CategorySchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    status: { type: Boolean, default: true },
    position: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

CategorySchema.index({ slug: 1, position: 1 });

const Category =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema, "categories");

export default Category;
