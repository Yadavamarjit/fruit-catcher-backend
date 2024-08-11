import express from "express";
import { addUser } from "../controllers/adduser.js";
import { findUser } from "../controllers/findUser.js";
import { updateUserScore } from "../controllers/updateUserScore.js";
import { leaderBoard } from "../controllers/leaderBoard.js";

export const userRoute = express.Router();
userRoute.post("/adduser", findUser, addUser);
userRoute.put("/highscore", updateUserScore);
userRoute.get("/leaderboard", leaderBoard);
