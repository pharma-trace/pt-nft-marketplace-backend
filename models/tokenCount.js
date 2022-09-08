import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const tokenCountSchema = new Schema({
  tokenId: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model("tokenCount", tokenCountSchema);
