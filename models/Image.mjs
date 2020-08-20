import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  data: {
    required: true,
    type: String,
  },
  title: {
    type: String,
    required: true,
    default: "Image" + Date.now().toString(),
  },
  uploaded: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model("image", ImageSchema);

export default Image;
