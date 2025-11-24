import mongoose, { Document, Schema } from "mongoose";

export interface IGallery extends Document {
  image: string;
  tagline: string;
  capturedBy: string;
  position: number;
  status: boolean;
  featured: boolean;
}

const GallerySchema: Schema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    tagline: { type: String, required: true, trim: true },
    capturedBy: { type: String, required: true, trim: true },
    position: { type: Number, required: true, default: 0 },
    status: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Gallery =
  mongoose.models.Gallery ||
  mongoose.model<IGallery>("Gallery", GallerySchema, "galleries");

export default Gallery;
