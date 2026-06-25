import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
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
});
const Board = mongoose.model("Board", boardSchema);
export default Board;
