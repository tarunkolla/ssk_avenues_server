import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FileSchema = new Schema({
  data: {
    required: true,
    type: String,
  },
  title: {
    type: String,
    required: true,
    default: "File" + Date.now().toString(),
  },
  uploaded: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model("file", FileSchema);

export default File;
