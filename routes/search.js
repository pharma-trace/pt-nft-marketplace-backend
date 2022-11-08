import express from "express";
import {
    searchAll,
} from "../controllers/search";

const router = express.Router();
router.get("/search-all", searchAll);

module.exports = router;