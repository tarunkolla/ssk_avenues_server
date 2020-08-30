import express from "express";
import auth from "../../middleware/auth.mjs";
import store, { gfs } from "../../middleware/store.mjs";
import mongoose from "mongoose";
import File from "../../models/File.mjs";

const router = express.Router();

/**
 * @route GET api/files/:id
 * @desc Get a file by id
 * @access Public
 */

router.get("/files/:id", async (req, res) => {
  const fileId = new mongoose.mongo.ObjectID(req.params.id);
  await gfs.files.findOne({ _id: fileId }, (error, file) => {
    if (error) {
      res.status(400).json({ message: error.message });
    }
    if (!file || file.length === 0) {
      res.status(404).json({ message: "File not found" });
    }
    res.status(200).json(file);
  });
});

/**
 * @route GET api/images/:id
 * @desc Get a file of type image by id
 * @access Public
 */

router.get("/images/:id", async (req, res) => {
  try {
    const fileId = new mongoose.mongo.ObjectID(req.params.id);

    await gfs.files.findOne({ _id: fileId }, (error, file) => {
      if (error) {
        res.status(400).json({ message: error.message });
      }
      if (!file || file.length === 0) {
        res.status(404).json({ message: "File not found" });
      }
      if (file.contentType.includes("image")) {
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({ message: "File not image" });
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route POST api/files
 * @desc Post a file
 * @access Private
 */
router.post("/files", [auth("STAFF"), store.single("file")], (req, res) => {
  res.json({ file: req.file });
});

export default router;
