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
  getCategories,
  updateTokenCount,
  getTokenCount,
  createCollection,
  getCollectionByAddress,
  getCollectionById,
  getAllCollection,
  getUserLazyNFT,
  getTopThreeUserNFT,
} from "../controllers/nft";

const router = express.Router();
router.post("/create-nft", createNFT);
router.get("/collection-name/:collectionName", collectionName);
router.get("/user-nft/:_id", userNft);
router.get("/users-nft", usersNft);
router.get("/find-user", findUser);
router.get("/search-user/:query", searchUser);
router.put("/like-nft", likeNft);
router.put("/unlike-nft", unlikeNft);
router.get("/get-categories", getCategories);
router.get("/get-tokenid", getTokenCount);
router.put("/update-tokenid", updateTokenCount);
router.post("/create-collection", createCollection);
router.get("/get-collection-by-id", getCollectionById);
router.get("/get-collection-by-address", getCollectionByAddress);
router.get("/get-all-collection", getAllCollection);
router.get("/get-user-lazy-nft", getUserLazyNFT);
router.get("/get-top-three-lazy-nft", getTopThreeUserNFT);

module.exports = router;
