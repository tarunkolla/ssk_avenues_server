import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PlotSchema = new Schema({
  plotNumber: {
    type: String,
    required: true,
    default: "Unknown",
  },
  area: String,
  units: String,
});

const Plot = mongoose.model("plot", PlotSchema);

export default Plot;
