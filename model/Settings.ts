import { ISettings } from "@/lib/types";
import mongoose, { Schema } from "mongoose";

const general = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true },
    companyDialCode: { type: String, required: true, trim: true },
    companyPhone: { type: String, required: true, trim: true },
    companyAddress: { type: String, required: true, trim: true },
    logo: { type: String, required: true, trim: true },
    favicon: { type: String, required: true, trim: true },
    supportEmail: { type: String, required: true, trim: true },
    ownerName: { type: String, required: true, trim: true },
    ownerEmail: { type: String, required: true, trim: true },
  },
  {
    _id: false,
  }
);

const SettingsSchema: Schema = new mongoose.Schema(
  {
    general,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Settings =
  mongoose.models.Settings ||
  mongoose.model<ISettings>("Settings", SettingsSchema, "settings");

export default Settings;
