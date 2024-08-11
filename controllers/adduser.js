import User from "../models/userModel.js";

export const addUser = async (req, res) => {
  const { name } = req.body;

  try {
    let user = await User.findOne({ name });

    user = new User({
      ...req.body,
    });
    await user.save();
    res
      .status(200)
      .json({ id: user._id, name: user.name, highscore: user.highscore });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
