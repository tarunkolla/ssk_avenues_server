import express from "express";
import auth from "../../middleware/auth.mjs";
import store, { gfs } from "../../middleware/store.mjs";
import mongoose from "mongoose";

const router = express.Router();

/**
 * @route GET api/files/:id
 * @desc Get a file by id
 * @access Public
 */

router.get("/files/:id", async (req, res) => {
  try {
    const fileId = new mongoose.mongo.ObjectID(req.params.id);

    await gfs.files.findOne({ _id: fileId }, (_error, file) => {
      if (!file || file.length === 0) {
        res.status(404).json({ message: "File not found" });
      } else if (!file.contentType.includes("pdf")) {
        res.status(415).json({ message: "Nice try" });
      } else {
        res.set({
          "Content-Type": file.contentType,
          "Content-Disposition": "attachment",
          filename: file.filename,
        });

        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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
      if (!file || file.length === 0 || !file.contentType.includes("image")) {
        res.status(404).json({ message: "Image not found" });
      }
      res.set("Cache-Control", "public, max-age=31557600, s-maxage=31557600");
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
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
  res.json({ ...req.file });
});

export default router;
