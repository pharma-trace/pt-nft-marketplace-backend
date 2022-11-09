import mongoose from "mongoose";

const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    name: {
      type: String,
      //   required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      //   required: true,
      // unique: true,
    },
    about: {},
    image: {
      type: String,
    },
    colorCode: {
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
    isColour: {
      type: Boolean,
      required: true,
    },
    following: [{ type: Schema.ObjectId, ref: "User" }],
    followers: [{ type: Schema.ObjectId, ref: "User" }],
    wallet: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
