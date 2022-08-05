import express from "express";
import {
    createNFT,
    userNft,
    findUser,
    searchUser,
    likeNft,
    unlikeNft,
    collectionName,
    usersNft,
} from "../controllers/createnft";

const router = express.Router();

router.post("/create-nft", createNFT);

router.get("/collection-name/:collectionName", collectionName);

router.get("/user-nft/:_id", userNft);
router.get("/users-nft", usersNft);

router.get("/find-user", findUser);
router.get("/search-user/:query", searchUser);

router.put("/like-nft", likeNft);
router.put("/unlike-nft", unlikeNft);

module.exports = router;