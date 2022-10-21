import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const nftSchema = new Schema(
  {
    tokenId: { type: String, required: true, unique: true },
    metadata: { type: String, required: true, unique: true },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    supply: { type: Number, default: 1 },
    collectionId: {
      type: String,
    },
    wallet: {
      type: String,
    },
    isListed: {
      type: Boolean,
      default: false,
    },
    signature: {
      type: String,
      default: "",
    },
    currency: {
      type: String,
      default: "",
    },
    price: {
      type: String,
      default: "",
    },
    likes: [{ type: ObjectId, reg: "Profile" }],
  },
  { timestamps: true }
);

export default mongoose.model("Nft", nftSchema);
