import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FileSchema = new Schema({
  title: String,
  length: Number,
  chunkSize: Number,
  uploadDate: Date,
  filename: String,
  md5: String,
});

const File = mongoose.model("file", FileSchema);

export default File;
