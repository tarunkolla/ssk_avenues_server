import express from "express";

import Layout from "../../models/Layout.mjs";
import Plot from "../../models/Plot.mjs";
import auth from "../../middleware/auth.mjs";
import store, { gfs } from "../../middleware/store.mjs";

const router = express.Router();

/**
 * @route GET api/layouts/:id
 * @desc Get layout by id
 * @access Public
 */
router.get("/:id", async (req, res) => {
  try {
    const layout = await Layout.findById(req.params.id).populate("plots");
    if (!layout) throw Error("Layout not found");

    res.status(200).json(layout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route GET api/layouts
 * @desc Get all Layouts
 * @access Public
 */

router.get("/", async (_req, res) => {
  try {
    const layouts = await Layout.find().select("-plots");
    if (!layouts) throw Error("No Layouts found");

    res.status(200).json(layouts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route POST api/layouts
 * @desc Post a Layout
 * @access Private
 */

router.post("/", auth("STAFF"), async (req, res) => {
  const newLayout = new Layout({
    ...req.body,
  });

  try {
    const layout = await newLayout.save();
    if (!layout) throw Error("Something went wrong saving the Layout");

    res.status(200).json(layout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route   PATCH api/layouts/:id
 * @desc    Updates a Layout
 * @access  Private
 */
router.patch("/:id", auth("STAFF"), async (req, res) => {
  try {
    const layout = await Layout.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!layout) throw Error("Something went wrong saving the Layout");

    res.status(200).json(layout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route   PATCH api/layouts/:id/plots
 * @desc    Updates a Layout with new Plot
 * @access  Private
 */
router.patch("/:id/plots", auth("STAFF"), async (req, res) => {
  const newPlot = new Plot({
    ...req.body,
  });

  try {
    const plot = await newPlot.save();
    if (!plot) throw Error("Something went wrong saving the Plot");

    const layout = await Layout.findById(req.params.id); //findByIdAndUpdate
    if (!layout) throw Error("Layout not found");
    layout.plots = [...layout.plots, plot._id];
    layout.lastUpdated = Date.now();

    const updatedLayout = await layout.save();
    if (!updatedLayout) throw Error("Something went wrong updating the Layout");

    res.status(200).json(updatedLayout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route   PATCH api/layouts/:id/image
 * @desc    Updates a Layout with new image
 * @access  Private
 */
router.patch(
  "/:id/image",
  [auth("STAFF"), store.single("image")],
  async (req, res) => {
    try {
      const layout = await Layout.findById(req.params.id); //findByIdAndUpdate
      const newImage = {
        title: req.body.title,
        image: req.file.id,
      };

      if (!layout) throw Error("Layout not found");
      layout.images = [...layout.images, newImage];
      layout.lastUpdated = Date.now();

      const updatedLayout = await layout.save();
      if (!updatedLayout)
        throw Error("Something went wrong updating the Layout");

      res.status(200).json(updatedLayout);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

/**
 * @route   PATCH api/layouts/:id/images
 * @desc    Updtes a Layout with new images
 * @access  Private
 */
router.patch(
  "/:id/images",
  [auth("STAFF"), store.single("image")],
  async (req, res) => {
    try {
      const layout = await Layout.findById(req.params.id); //findByIdAndUpdate
      const newImage = req.body;

      if (!layout) throw Error("Layout not found");
      layout.images = [...newImage];
      layout.lastUpdated = Date.now();

      const updatedLayout = await layout.save();
      if (!updatedLayout)
        throw Error("Something went wrong updating the Layout");

      res.status(200).json(updatedLayout);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

/**
 * @route   PATCH api/layouts/:id/brochure
 * @desc    Updtes a Layout with new brochure
 * @access  Private
 */
router.patch(
  "/:id/brochure",
  [auth("STAFF"), store.single("brochure")],
  async (req, res) => {
    try {
      const layout = await Layout.findById(req.params.id); //findByIdAndUpdate
      if (!layout) throw Error("Layout not found");
      const oldBrochure = layout.brochure;
      if (oldBrochure) await gfs.files.deleteOne({ _id: oldBrochure });

      layout.brochure = req.file.id;
      layout.lastUpdated = Date.now();

      const updatedLayout = await layout.save();
      if (!updatedLayout)
        throw Error("Something went wrong updating the Layout");

      res.status(200).json(updatedLayout);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

/**
 * @route   DELETE api/Layouts/:id
 * @desc    Delete a Layout
 * @access  Private
 */

router.delete("/:id", auth("ADMIN"), async (req, res) => {
  try {
    const layout = await Layout.findById(req.params.id);
    if (!layout) throw Error("No Layout found");

    const removed = await layout.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the Layout");

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
});

export default router;
