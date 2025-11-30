import mongoose, { Document, Schema } from "mongoose";

export interface IOutlet extends Document {
  name: string;
  location: string;
  googleMapLink: string;
  dialCode: string;
  phone: string;
  image: string;
  status: boolean;
}

const OutletSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    googleMapLink: { type: String, required: true, trim: true },
    dialCode: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

OutletSchema.index({ position: 1 });

const Outlet =
  mongoose.models.Outlet ||
  mongoose.model<IOutlet>("Outlet", OutletSchema, "outlets");

export default Outlet;
