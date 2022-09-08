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
    isColour: {
      type: Boolean,
      required: true,
    },
    image: String,
    banner: String,
    following: [{ type: Schema.ObjectId, ref: "User" }],
    followers: [{ type: Schema.ObjectId, ref: "User" }],
    wallet: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
