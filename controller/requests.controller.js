import RequestModel from "../model/Request.model.js";


// Create a new request
export const createRequest = async (req, res, next) => {
  try {
    const { title, category, description } = req.body;

    const request = new RequestModel({
      title,
      category,
      description,
      userId: req.user._id, // from JWT
    });

    await request.save();
    res.status(201).json(request);
  } catch (err) {
    next(err);
  }
};

// Get all requests for logged-in user
export const getUserRequests = async (req, res, next) => {
  try {
    const requests = await RequestModel.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    next(err);
  }
};

// Update request status (admin only)
export const updateRequestStatus = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { status } = req.body;
    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await RequestModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json(request);
  } catch (err) {
    next(err);
  }
};
