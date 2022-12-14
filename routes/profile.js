import express from "express";
import {
  profile,
  findUser,
  updateProfile,
  createUpdateProfile,
} from "../controllers/profile";

const router = express.Router();

router.post("/user-profile", profile);
router.get("/get-user-details", findUser);
router.post("/get-update-profile", updateProfile);
router.post("/create-update-profile", createUpdateProfile);

module.exports = router;
