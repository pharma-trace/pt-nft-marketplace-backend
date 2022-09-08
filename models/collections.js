import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const collectionSchema = new Schema({
  collectionId: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  collectionName: {
    type: String,
    required: true,
  },
  collectionDescription: {
    type: String,
  },
  collectionImage: {
    type: String,
    required: true,
  },
});

export default mongoose.model("collections", collectionSchema);
