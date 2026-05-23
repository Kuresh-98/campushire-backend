const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    driveId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drive",
      required: true
    },

    status: {
      type: String,
      enum: [
        "applied",
        "shortlisted",
        "rejected",
        "interview_scheduled",
        "selected",
        "waitlisted"
      ],
      default: "applied"
    },

    appliedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }

  
);
applicationSchema.index(
  { studentId: 1, driveId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Application", applicationSchema);