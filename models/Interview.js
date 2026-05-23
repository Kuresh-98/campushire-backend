const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true
    },

    round: {
      type: String,
      enum: [
        "aptitude",
        "technical",
        "hr",
        "group_discussion"
      ]
    },

    interviewDate: {
      type: Date
    },

    meetingLink: {
      type: String
    },

    status: {
      type: String,
      enum: ["scheduled", "completed"],
      default: "scheduled"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Interview", interviewSchema);