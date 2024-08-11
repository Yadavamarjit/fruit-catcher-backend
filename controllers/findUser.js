import User from "../models/userModel.js";

export const findUser = async (req, res, next) => {
  const { name } = req.body;

  try {
    let user = await User.findOne({ name });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    next();
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
