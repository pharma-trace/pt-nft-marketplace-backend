import Nft from "../models/nft";

export const createNFT = async(req, res) => {
    const {
        ipfs,
        name,
        description,
        price,
        category,
        properties,
        supply,
        wallet,
        protocol,
        metadata,
        collectionName,
        collectionImage,
        collectionDescription,
    } = req.body;
    if (!name.length && !description.length) {
        return res.json({
            error: "NFT Asset Name and Description Required",
        });
    }
    try {
        const nft = new Nft({
            ipfs,
            name,
            description,
            category,
            price,
            properties,
            supply,
            wallet,
            collectionName,
            collectionImage,
            collectionDescription,
        });
        nft.save();
        res.json(nft);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error Found");
    }
};

export const userNft = async(req, res) => {
    try {
        const nft = await Nft.findById(req.params._id);
        res.json(nft);
    } catch (err) {
        console.log(err);
    }
};

export const collectionName = async(req, res) => {
    try {
        const nft = await Nft.findOne(req.params.collectionName);
        res.json(nft);
    } catch (err) {
        console.log(err);
    }
};

export const findUser = async(req, res) => {
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

export const searchUser = async(req, res) => {
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

export const likeNft = async(req, res) => {
    try {
        const nft = await Nft.findByIdAndUpdate(
            req.body._id, {
                $addToSet: {
                    likes: req.profile._id,
                },
            }, {
                new: true,
            }
        );
        res.json(nft);
    } catch (err) {
        console.log(err);
    }
};

export const unlikeNft = async(req, res) => {
    try {
        const nft = await Nft.findByIdAndUpdate(
            req.body._id, {
                $pull: {
                    unlikes: req.profile._id,
                },
            }, { new: true }
        );
        res.json(nft);
    } catch (err) {
        console.log(err);
    }
};

export const usersNft = async(req, res) => {
    try {
        const nft = await Nft.find();
        // .populate("createdBy", "name ipfs")
        //     .sort({ createdAt: -1 })
        //     .limit(10);
        res.json(nft);
    } catch (err) {
        console.log(err);
    }
};