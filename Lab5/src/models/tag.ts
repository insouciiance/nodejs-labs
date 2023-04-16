import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }]
});

export default mongoose.model("Tag", tagSchema);
