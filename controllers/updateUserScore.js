import User from "../models/userModel.js";

export const updateUserScore = async (req, res) => {
  const { highscore, id } = req.body;
  try {
    let user = await User.findOne({ _id: id });

    if (user) {
      user.highscore = highscore;
      await user.save();
      return res.json({ highScore: user.highscore });
    } else {
      return res.status(400).json({ err: "User doesn't exist" });
    }
  } catch (error) {
    console.error("Error finding or updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
