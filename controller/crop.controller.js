import Crop from "../models/Crop.js";

// GET all crops
export const getCrops = async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST new crop (Admin)
export const createCrop = async (req, res) => {
  try {
    const { name, sowing, harvest, tips } = req.body;
    const pdf = req.files?.pdf ? `/uploads/${req.files.pdf[0].filename}` : "";
    const video = req.files?.video ? `/uploads/${req.files.video[0].filename}` : "";

    const crop = await Crop.create({ name, sowing, harvest, tips, pdf, video });
    res.json(crop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update crop (Admin)
export const updateCrop = async (req, res) => {
  try {
    const { name, sowing, harvest, tips } = req.body;
    const updateData = { name, sowing, harvest, tips };

    if (req.files?.pdf) updateData.pdf = `/uploads/${req.files.pdf[0].filename}`;
    if (req.files?.video) updateData.video = `/uploads/${req.files.video[0].filename}`;

    const crop = await Crop.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(crop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE crop (Admin)
export const deleteCrop = async (req, res) => {
  try {
    await Crop.findByIdAndDelete(req.params.id);
    res.json({ message: "Crop deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
