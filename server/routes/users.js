import express from "express";
const router = express.Router();

import { updateProfile, deleteProfile, getUserProfile, followUser, unfollowUser } from "../controllers/users.js";

router.post("/:id", updateProfile);
router.post("/:id", deleteProfile);
router.post("/:id", getUserProfile);
router.post("/:id/follow", followUser);
router.post("/:id/unfollow", unfollowUser);

export default router;