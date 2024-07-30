const mongoose = require("mongoose");

const mediaFileSchema = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    providerPublicId: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    messageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

const MediaFile = mongoose.model("MediaFile", mediaFileSchema);

module.exports = MediaFile;
