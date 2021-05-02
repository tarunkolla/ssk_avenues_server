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
  address: String,
  addressHref: String,

  plots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plot",
    },
  ],
  images: [
    {
      _id: false,
      image: mongoose.Schema.Types.ObjectId,
      title: String,
    },
  ],
  brochure: mongoose.Schema.Types.ObjectId,
});

const Layout = mongoose.model("layout", LayoutSchema);

export default Layout;
