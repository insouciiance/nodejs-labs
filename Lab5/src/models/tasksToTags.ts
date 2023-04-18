import mongoose from "mongoose";

const tasksToTagsSchema = new mongoose.Schema({
  tagId: { type: mongoose.Schema.Types.ObjectId, ref: "Tag" },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" }
});

export default mongoose.model("TasksToTags", tasksToTagsSchema);
