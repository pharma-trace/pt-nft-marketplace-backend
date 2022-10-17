import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const collectionSchema = new Schema({
  id: {
    type: String,
    default: function genUUID() {
      return uuid.v1();
    },
  },
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
    required: true,
  },
});

export default mongoose.model("collections", collectionSchema);
