const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema(
  {
    title: {
      type: String,
      // required: true,
      trim: true,
    },
    description: {
      type: String,
      // required: true,
      trim: true,
      maxlength: 500,
    },
    images: {
      type: String,
      // required: true,
      default:"https://plus.unsplash.com/premium_photo-1732018942706-741311294ee0?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      set: (v) =>
        v === ""
          ? "https://plus.unsplash.com/premium_photo-1732018942706-741311294ee0?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          : v,
    },
    location: {
      type: String,
      // required: true,
    },
    country: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
