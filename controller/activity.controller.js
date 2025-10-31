import Activity from "../model/activity.model.js";
export const createActivity = async (req, res) => {
  try {
    const {  type, description } = req.body;
    const activity = await Activity.create({  type, description });
    res.status(201).json(activity);
  } catch (err) {
    res.status(500).json({ message: "Failed to create activity", error: err.message });
  }
};
export const getRecentActivities = async (req, res) => {
  try {
    // const { userId } = req.params;
    const activities = await Activity.find({ userId })
      .sort({ createdAt: -1 })   
      .limit(5);  
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch activities", error: err.message });
  }
};
