import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    inviteToken: String,
    inviteTokenExpires: Date,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    title: {
      type: String,
      required: true,
    },
    columns: [
      {
        title: String,
        order: Number,
      },
    ],
  },

  { timestamps: true }
);
const Board = mongoose.model("Board", boardSchema);
export default Board;
