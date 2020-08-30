import express from "express";
import Plot from "../../models/Plot.mjs";
import auth from "../../middleware/auth.mjs";

const router = express.Router();

/**
 * @route GET api/plots/:id
 * @desc Get plot by id
 * @access Public
 */
router.get("/:id", async (req, res) => {
  try {
    const plot = await Plot.findById(req.params.id);
    if (!plot) throw Error("Plot not found");

    res.status(200).json(plot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route GET api/Plots
 * @desc Get all Plots
 * @access Public
 */

router.get("/", async (req, res) => {
  try {
    const plots = await Plot.find();
    if (!plots) throw Error("No Plots found");

    res.status(200).json(plots);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route POST api/Plots
 * @desc Post a Plot
 * @access Private
 */

router.post("/", auth("STAFF"), async (req, res) => {
  const newPlot = new Plot({
    ...req.body,
  });

  try {
    const plot = await newPlot.save();
    if (!plot) throw Error("Something went wrong saving the Plot");

    res.status(200).json(plot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route   PATCH api/plots/:id
 * @desc    Updates a plot
 * @access  Private
 */
router.patch("/:id", auth("STAFF"), async (req, res) => {
  try {
    const plot = await Plot.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!plot) throw Error("Plot not found");
    res.status(200).json(plot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route   DELETE api/Plots/:id
 * @desc    Delete a Plot
 * @access  Private
 */

router.delete("/:id", auth("ADMIN"), async (req, res) => {
  try {
    const plot = await Plot.findById(req.params.id);
    if (!plot) throw Error("No Plot found");

    const removed = await plot.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the Plot");

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
});

export default router;
