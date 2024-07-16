const mongoose = require("mongoose");

const ShortenSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter url name"],
    },

    originalUrl: {
      type: String,
      required: [true, "Please enter url"],
    },
    shortenedUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// To allow mongodb to use the model, rememmber to name in singular e.g. "Shorten"
const Shorten = mongoose.model("Shorten", ShortenSchema);
module.exports = Shorten;
