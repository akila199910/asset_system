import mongoose from "mongoose";

const userProfileModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  profilePic: {
    type: String,
    required: false,
  },
});

export default mongoose.model("UserProfiles", userProfileModel);
