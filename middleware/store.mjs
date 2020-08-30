import gridStream from "gridfs-stream";
import gridStorage from "multer-gridfs-storage";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import mongoose from "mongoose";
import config from "../config/index.mjs";

const connection = mongoose.connection;
const collectionName = "files";
const { MONGO_URI } = config;
let gfs;

connection.once("open", () => {
  gfs = gridStream(connection.db, mongoose.mongo);
  gfs.collection(collectionName);
});

//grid storage
const storage = gridStorage({
  url: MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: collectionName,
        };
        resolve(fileInfo);
      });
    });
  },
});
const store = multer({ storage });

export { gfs };
export default store;
