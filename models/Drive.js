const mongoose = require("mongoose");

const driveSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },

    role: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    package: {
      type: Number
    },

    driveType: {
      type: String,
      enum: ["internship", "full-time"]
    },

    minimumCgpa: {
      type: Number
    },

    eligibleBranches: [
      {
        type: String
      }
    ],
    createdBy: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User"
},

    allowedBacklogs: {
      type: Number,
      default: 0
    },

    requiredSkills: [
      {
        type: String
      }
    ],

    lastDateToApply: {
      type: Date
    },

    interviewDate: {
      type: Date
    },

    status: {
      type: String,
      enum: ["draft", "published", "closed"],
      default: "draft"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Drive", driveSchema);