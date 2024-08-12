import User from "../models/userModel.js";

export const leaderBoard = async (req, res) => {
  try {
    const { id } = req.query;

    const currentUser = await User.findOne(
      { _id: id },
      { name: 1, highscore: 1, country_code: 1, _id: 0 }
    );

    const topPlayers = await User.find(
      {},
      { name: 1, highscore: 1, country_code: 1, _id: 0 }
    )
      .sort({ highscore: -1 })
      .limit(25);

    // Add rank to topPlayers
    const topPlayersWithRank = topPlayers.map((player, index) => ({
      ...player.toObject(),
      rank: index + 1,
    }));

    if (!currentUser) {
      return res.json({ topPlayers: topPlayersWithRank });
    }

    const currentUserRank =
      (await User.countDocuments({
        highscore: { $gt: currentUser.highscore },
      })) + 1;

    let userContext = [];
    if (!topPlayers.some((player) => player.name === currentUser.name)) {
      const surroundingPlayers = await User.find(
        {},
        { name: 1, highscore: 1, country_code: 1, _id: 0 }
      )
        .sort({ highscore: -1 })
        .skip(Math.max(0, currentUserRank - 3))
        .limit(5);

      userContext = surroundingPlayers.map((player, index) => ({
        ...player.toObject(),
        rank: currentUserRank - 2 + index,
      }));
    }

    return res.json({
      currentUserRank,
      topPlayers: [...topPlayersWithRank, ...userContext],
    });
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    return res.status(500).json({ err: "Internal server error" });
  }
};
