import Nft from "../models/nft";
import category from "../models/category";
import tokenCount from "../models/tokenCount";
import collections from "../models/collections";
export const createNFT = async (req, res) => {
  const {
    tokenId,
    name,
    description,
    category,
    supply,
    wallet,
    metadata,
    collectionId,
  } = req.body;
  try {
    var response = {};

    const nft = new Nft({
      tokenId,
      name,
      description,
      category,
      supply,
      wallet,
      metadata,
      collectionId,
    });
    nft.save();

    res.json(nft);
  } catch (err) {
    console.log(err);
    response.status = 400;
    response.err = err;
    res.json(response);

    // return res.status(400).send("Error Found");
  }
};
export const listedNFT = async (req, res) => {
  try {
    // const tokenCountRes = await tokenCount.findAndModify(
    //   { name: "pharmatraceToken" },
    //   { $inc: { tokenId: 1 } }
    // );
    var response = {};

    const updatedNFT = await Nft.updateOne(
      {
        collectionId: req.body.collectionId,
        wallet: req.body.wallet,
        tokenId: req.body.tokenId,
      },
      {
        $set: {
          isListed: true,
          signature: req.body.signature,
          price: req.body.price,
          currency: req.body.currency,
          isFixedPrice: req.body.isFixedPrice,
          autionDate: req.body.autionDate,
        },
      }
    );
    console.log("updatedNFT", updatedNFT);
    response.status = 200;
    response.data = updatedNFT;
    res.json(response);
  } catch (err) {
    var response = {};
    response.status = 400;
    res.json(response);

    console.log(err);
  }
};

export const unListedNFT = async (req, res) => {
  try {
    // const tokenCountRes = await tokenCount.findAndModify(
    //   { name: "pharmatraceToken" },
    //   { $inc: { tokenId: 1 } }
    // );
    var response = {};
    console.log("req.body", req.body);

    const updatedNFT = await Nft.updateOne(
      {
        collectionId: req.body.collectionId,
        wallet: req.body.wallet,
        tokenId: req.body.tokenId,
      },
      {
        $set: {
          isListed: false,
          signature: req.body.signature,
          price: req.body.price,
          currency: req.body.currency,
          isFixedPrice: req.body.isFixedPrice,
          autionDate: req.body.autionDate,
        },
      }
    );
    console.log("updatedNFT", updatedNFT);
    response.status = 200;
    response.data = updatedNFT;
    res.json(response);
  } catch (err) {
    var response = {};
    response.status = 400;
    res.json(response);

    console.log(err);
  }
};
export const getCollectionNFTWithLimit = async (req, res) => {
  try {
    var nft = {};
    const nftRes = await Nft.find(
      {
        collectionId: req.query.collectionId,
        wallet: req.query.wallet,
      },
      {}
    ).limit(req.query.limit);
    console.log("getCollectionNFTWithLimit", req.query);
    // .populate("createdBy", "name ipfs")
    //     .sort({ createdAt: -1 })
    //     .limit(10);
    nft.status = 200;
    nft.row = nftRes;
    res.json(nft);
  } catch (err) {
    var nft = {};
    nft.status = 400;
    res.json(nft);
    console.log(err);
  }
};
export const getListedNFTWithLimit = async (req, res) => {
  try {
    var nft = {};
    const nftRes = await Nft.find(
      {
        collectionId: req.query.collectionId,
        wallet: { $ne: req.query.wallet },
        isListed: true,
      },
      {}
    ).limit(req.query.limit);
    console.log("getCollectionNFTWithLimit", req.query);
    // .populate("createdBy", "name ipfs")
    //     .sort({ createdAt: -1 })
    //     .limit(10);
    nft.status = 200;
    nft.row = nftRes;
    res.json(nft);
  } catch (err) {
    var nft = {};
    nft.status = 400;
    res.json(nft);
    console.log(err);
  }
};
export const getListedNFTWithCollection = async (req, res) => {
  try {
    var nft = {};
    const nftRes = await Nft.find(
      {
        collectionId: req.query.collectionId,
        wallet: { $ne: req.query.wallet },
        isListed: true,
      },
      {}
    );
    console.log("getCollectionNFTWithLimit", req.query);
    // .populate("createdBy", "name ipfs")
    //     .sort({ createdAt: -1 })
    //     .limit(10);
    nft.status = 200;
    nft.row = nftRes;
    res.json(nft);
  } catch (err) {
    var nft = {};
    nft.status = 400;
    res.json(nft);
    console.log(err);
  }
};
export const getUserLazyNFT = async (req, res) => {
  try {
    var nft = {};
    const nftRes = await Nft.find(
      {
        collectionId: req.query.collectionId,
        wallet: req.query.wallet,
      },
      {}
    );
    // .populate("createdBy", "name ipfs")
    //     .sort({ createdAt: -1 })
    //     .limit(10);
    nft.status = 200;
    nft.row = nftRes;
    res.json(nft);
  } catch (err) {
    var nft = {};
    nft.status = 400;
    res.json(nft);
    console.log(err);
  }
};
export const getNFTDetails = async (req, res) => {
  try {
    var nft = {};
    const nftRes = await Nft.find(
      {
        collectionId: req.query.collectionId,
        tokenId: req.query.tokenId,
      },
      {}
    );
    // .populate("createdBy", "name ipfs")
    //     .sort({ createdAt: -1 })
    //     .limit(10);
    nft.status = 200;
    nft.nftDetails = nftRes[0];
    res.json(nft);
  } catch (err) {
    var nft = {};
    nft.status = 400;
    res.json(nft);
    console.log(err);
  }
};
export const userNft = async (req, res) => {
  try {
    const nft = await Nft.findById(req.params._id);
    res.json(nft);
  } catch (err) {
    console.log(err);
  }
};

export const collectionName = async (req, res) => {
  try {
    const nft = await Nft.findOne(req.params.collectionName);
    res.json(nft);
  } catch (err) {
    console.log(err);
  }
};

export const findUser = async (req, res) => {
  try {
    const nft = await Nft.findById(req.auth._id);
    //usefollowing list
    let following = Nft.following;
    following.push(nft._id);
    const people = await Nft.find({ _id: { $nin: following } })
      .select("name wallet")
      .limit(10);
    res.json(nft);
  } catch (err) {
    console.log(err);
  }
};

export const searchUser = async (req, res) => {
  const { query } = req.params;
  if (!query) return;
  //regex is a special method for mongodb
  // The i modifier is used to perform case-insensitive matching
  try {
    const nft = await Nft.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
    }).select("wallet");
    res.json(profile);
  } catch (err) {
    console.log(err);
  }
};

export const likeNft = async (req, res) => {
  try {
    const nft = await Nft.findByIdAndUpdate(
      req.body._id,
      {
        $addToSet: {
          likes: req.profile._id,
        },
      },
      {
        new: true,
      }
    );
    res.json(nft);
  } catch (err) {
    console.log(err);
  }
};

export const unlikeNft = async (req, res) => {
  try {
    const nft = await Nft.findByIdAndUpdate(
      req.body._id,
      {
        $pull: {
          unlikes: req.profile._id,
        },
      },
      { new: true }
    );
    res.json(nft);
  } catch (err) {
    console.log(err);
  }
};

export const usersNft = async (req, res) => {
  try {
    const nft = await Nft.find();
    // .populate("createdBy", "name ipfs")
    //     .sort({ createdAt: -1 })
    //     .limit(10);
    res.json(nft);
  } catch (err) {
    console.log(err);
    var mongoRes;
    mongoRes.status = 400;
    res.json(mongoRes);
  }
};
export const getCategories = async (req, res) => {
  try {
    var response = {};
    const mongoRes = await category.find();
    // .populate("createdBy", "name ipfs")
    //     .sort({ createdAt: -1 })
    //     .limit(10);
    response.row = mongoRes;
    response.status = 200;
    // console.log("mongoRes", response);

    res.json(response);
  } catch (err) {
    console.log(err);
    var mongoRes;
    mongoRes.status = 400;
    res.json(mongoRes);
  }
};

export const getTokenCount = async (req, res) => {
  try {
    var response = {};

    const tokenCountRes = await tokenCount.find();
    // .populate("createdBy", "name ipfs")
    //     .sort({ createdAt: -1 })
    //     .limit(10);
    console.log("tokenCountRes  ", tokenCountRes);
    response.status = 200;
    response.tokenId = tokenCountRes[0].tokenId;
    res.json(response);
  } catch (err) {
    console.log(err);
    var tokenCountRes;
    tokenCountRes.status = 400;
    res.json(tokenCountRes);
  }
};

export const updateTokenCount = async (req, res) => {
  try {
    // const tokenCountRes = await tokenCount.findAndModify(
    //   { name: "pharmatraceToken" },
    //   { $inc: { tokenId: 1 } }
    // );
    var response = {};

    const tokenCountRes = await tokenCount.findByIdAndUpdate(
      req.body._id,
      {
        $inc: { tokenId: 1 },
      },
      { new: true }
    );
    response.status = 200;
    response.tokenId = tokenCountRes.tokenId;
    res.json(response);
  } catch (err) {
    var tokenCountRes;
    tokenCountRes.status = 400;
    res.json(tokenCountRes);

    console.log(err);
  }
};

export const createCollection = async (req, res) => {
  const {
    address,
    name,
    description,
    image,
    banner,
    customURL,
    websiteURL,
    facebookURL,
    twitterURL,
    instagramURL,
    tiktokURL,
    youtubeURL,
  } = req.body;
  try {
    var response = {};

    const collection = new collections({
      address,
      name,
      description,
      image,
      banner,
      customURL,
      websiteURL,
      facebookURL,
      twitterURL,
      instagramURL,
      tiktokURL,
      youtubeURL,
    });
    collection.save();
    response.status = 200;
    res.json(response);
  } catch (err) {
    console.log(err);
    var collectionsRes;
    collectionsRes.status = 400;
    res.json(collection);

    // return res.status(400).send("Error Found");
  }
};

export const getCollectionByAddress = async (req, res) => {
  var response = {};

  try {
    const collectionsRes = await collections.find(
      { address: req.query.address },
      {}
    );
    // .populate("createdBy", "name ipfs")
    //     .sort({ createdAt: -1 })
    //     .limit(10);
    response.status = 200;
    response.collections = collectionsRes[0];
    res.json(response);
  } catch (err) {
    response.status = 400;
    res.json(response);
  }
};
export const getCollectionById = async (req, res) => {
  var response = {};

  try {
    const collectionsRes = await collections.find({ _id: req.query.id }, {});
    // .populate("createdBy", "name ipfs")
    //     .sort({ createdAt: -1 })
    //     .limit(10);
    response.status = 200;
    response.collections = collectionsRes[0];
    res.json(response);
  } catch (err) {
    response.status = 400;
    res.json(response);
  }
};

export const getAllCollection = async (req, res) => {
  try {
    var response = {};

    const collectionsRes = await collections.find();
    // .populate("createdBy", "name ipfs")
    //     .sort({ createdAt: -1 })
    //     .limit(10);
    // console.log("getAllCollection ==> ", collectionsRes);
    response.status = 200;
    response.row = collectionsRes;
    res.json(response);
  } catch (err) {
    var collectionsRes = {};
    collectionsRes.status = 400;
    res.json(collectionsRes);

    console.log(err);
  }
};
