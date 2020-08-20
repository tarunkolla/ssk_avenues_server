import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PlotSchema = new Schema({
  plotNumber: {
    type: String,
    required: true,
    default: "Unknown",
  },
  status: {
    type: String,
    required: true,
    default: "LISTED",
  },
  type: {
    type: String,
    required: true,
    default: "Lot",
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
  description: String,
  address: String,
  area: String,
  layout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "layout",
  },
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "image",
    },
  ],
});

const Plot = mongoose.model("plot", PlotSchema);

export default Plot;
