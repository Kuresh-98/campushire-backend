const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    enrollmentNumber: {
      type: String
    },

    branch: {
      type: String
    },

    cgpa: {
      type: Number
    },

    graduationYear: {
      type: Number
    },

    backlogCount: {
      type: Number,
      default: 0
    },

    skills: [
      {
        type: String
      }
    ],

    certifications: [
      {
        type: String
      }
    ],

    githubUrl: {
      type: String
    },

    linkedinUrl: {
      type: String
    },

    resumeUrl: {
      type: String
    },

    placementStatus: {
      type: String,
      enum: ["unplaced", "placed"],
      default: "unplaced"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Student", studentSchema);