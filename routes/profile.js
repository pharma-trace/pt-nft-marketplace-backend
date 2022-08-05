import express from "express";
import { profile } from "../controllers/profile";

const router = express.Router();

router.post("/user-profile", profile);

module.exports = router;