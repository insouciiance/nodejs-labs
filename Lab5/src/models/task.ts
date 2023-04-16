import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true},
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true }]
});

export default mongoose.model("Task", taskSchema);
