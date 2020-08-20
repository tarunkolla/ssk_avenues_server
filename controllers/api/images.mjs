import express from "express";
// import multer from "multer";

import Image from "../../models/Image.mjs";

const router = express.Router();
// Storage options
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "./uploads/");
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 25, //25mb limit
//   },
//   fileFilter: (req, file, callback) => {
//     callback(null, true); //storge all files for now
//   },
// });

/**
 * @route POST api/images
 * @desc Post a image
 * @access Public
 */

// router.post("/", upload.single("data"), async (req, res) => {
//   console.log(req.file);
// const newImage = new Image({
//   ...req.body,
// });

// try {
//   const image = await newImage.save();
//   if (!image) throw Error("Something went wrong saving the image");

//   res.status(200).json({ success: true });
// } catch (error) {
//   res.status(400).json({ message: error.message });
// }
// });

export default router;
