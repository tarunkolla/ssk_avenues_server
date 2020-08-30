import mongoose from "mongoose";
// import { isEmail } from "validator";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: true,
    minlengthlength: 1,
    maxlength: 20,
  },
  since: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
  role: {
    type: [
      { type: String, enum: ["PUBLIC", "USER", "AGENT", "STAFF", "ADMIN"] },
    ],
    default: ["PUBLIC"],
    required: true,
  },
  email: {
    unique: true,
    required: true,
    type: String,
    minlength: 6,
    maxlength: 36,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 108,
  },
  displayPicture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "file",
  },
  savedLayouts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "layout",
    },
  ],
  savedPlots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plot",
    },
  ],
});

const User = mongoose.model("user", UserSchema);

export default User;
