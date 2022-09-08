import express from "express";
import { profile, findUser } from "../controllers/profile";

const router = express.Router();

router.post("/user-profile", profile);
router.get("/get-user-details", findUser);

module.exports = router;
