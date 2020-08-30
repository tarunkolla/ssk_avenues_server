import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LayoutSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  availablePlots: {
    type: Number,
    required: true,
    default: 1,
  },
  totalPlots: {
    type: Number,
    required: true,
    default: 1,
  },
  address: String,
  plots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plot",
    },
  ],
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "file",
    },
  ],
});

const Layout = mongoose.model("layout", LayoutSchema);

export default Layout;
