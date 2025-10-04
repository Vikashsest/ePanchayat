import { Scheme } from "../model/Scheme.model.js";

export const getSchemes = async (req, res) => {
  const schemes = await Scheme.find({});
  res.status(200).json({ success: true, data: schemes });
};

export const getSchemesByCategory = async (req, res) => {
  const category = req.params.category;
  const schemes = await Scheme.find({ category });
  res.status(200).json({ success: true, data: schemes });
};
export const createScheme = async (req, res) => {
  const { title, category, description, link } = req.body;

  if (!title || !category || !description) {
    throw new ApiError(400, "Title, category and description are required");
  }

  const newScheme = await Scheme.create({ title, category, description, link });
  res.status(201).json({ success: true, data: newScheme });
};
