import mongoose, { Document, Schema } from "mongoose";

export interface IReserveTable extends Document {
  outlet: Schema.Types.ObjectId;
  reason: string;
  name: string;
  email: number;
  dialCode: string;
  phone: string;
  reservedAt: Date;
  numOfPeople: number;
  message: string;
  status: "pending" | "confirmed" | "cancelled";
}

const ReserveTableSchema: Schema = new mongoose.Schema(
  {
    outlet: { type: Schema.Types.ObjectId, ref: "Outlet" },
    reason: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    dialCode: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    reservedAt: { type: Date, required: true },
    numOfPeople: { type: Number, required: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ReserveTableSchema.index({ category: 1 });

const ReserveTable =
  mongoose.models.ReserveTable ||
  mongoose.model<IReserveTable>(
    "ReserveTable",
    ReserveTableSchema,
    "reserve_tables"
  );

export default ReserveTable;
