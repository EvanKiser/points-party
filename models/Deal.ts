import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// Deal SCHEMA
const dealSchema = new mongoose.Schema(
  {
    origin: {
      type: String,
      lowercase: true,
      required: true,
    },
    destination: {
      type: String,
      lowercase: true,
      required: true,
    },
    carrier: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    cost_in_points: {
      type: Number,
      required: true,
    },
    deal_found_date: {
      type: Date,
      default: Date.now,
    },
    deal_end_date: {
      type: Date,
      default: null,
    },
    num_times_sent: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// add plugin that converts mongoose to json
dealSchema.plugin(toJSON);

export default mongoose.models.Deal || mongoose.model("Deal", dealSchema);
