import User from "../models/userModel.js";

export const leaderBoard = async (req, res) => {
  try {
    const { id } = req.query;

    const currentUser = await User.findOne(
      { _id: id },
      { name: 1, highscore: 1, country_code: 1 }
    );

    const topPlayers = await User.find(
      {},
      { name: 1, highscore: 1, country_code: 1, _id: 0 } // Exclude _id
    )
      .sort({ highscore: -1 })
      .limit(25);

    if (!currentUser) {
      return res.json({ top25: topPlayers });
    }

    const currentUserRank =
      (await User.countDocuments({
        highscore: { $gt: currentUser.highscore },
      })) + 1;

    return res.json({ currentUserRank, topPlayers });
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    return res.status(500).json({ err: "Internal server error" });
  }
};
