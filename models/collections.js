import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const collectionSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  banner: {
    type: String,
  },
  customURL: {
    type: String,
  },
  websiteURL: {
    type: String,
  },
  facebookURL: {
    type: String,
  },
  twitterURL: {
    type: String,
  },
  instagramURL: {
    type: String,
  },
  tiktokURL: {
    type: String,
  },
  youtubeURL: {
    type: String,
  },
});

export default mongoose.model("collections", collectionSchema);
