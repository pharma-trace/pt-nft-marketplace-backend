import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const nftSchema = new Schema({
    ipfs: {},
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {},
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    properties: {},
    supply: {},
    collectionName: {
        type: String,
    },
    collectionImage: {},
    wallet: {
        type: String,
    },
    likes: [{ type: ObjectId, reg: "Profile" }],
    collectionDescription: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.model("Nft", nftSchema);