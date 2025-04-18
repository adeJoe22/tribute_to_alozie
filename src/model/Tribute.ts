import mongoose from "mongoose";

const tributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    relationship: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const TributeModel = mongoose.model(
  "Tribute",
  tributeSchema,
  "Tribute",
);

export default TributeModel;
