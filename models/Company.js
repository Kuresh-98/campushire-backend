const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true
    },

    website: {
      type: String
    },

    hrName: {
      type: String
    },

    hrEmail: {
      type: String
    },

    location: {
      type: String
    },

    hiringType: {
      type: String,
      enum: ["internship", "full-time", "both"]
    },

    
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Company", companySchema);