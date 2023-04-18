import express, { Request, Response } from "express";
import Tag from "../models/tag";
import Task from "../models/task";
import TaskToTag from "../models/tasksToTags";
import tasksToTags from "../models/tasksToTags";

export const tags = express.Router();

tags.get("/tags", async function (req: Request, res: Response) {
  try {
    const tags = await Tag.find(req.query);

    for(const tag of tags) {
      const tasks = (await TaskToTag.find({ tagId: { $eq: tag._id } })).map(e => e.taskId);
      tag["_doc"]["tasks"] = tasks;
    }

    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

tags.get("/tags/:id", async function (req: Request, res: Response) {
  const tag = await Tag.findById(req.params.id);
  tag["_doc"]["tasks"] = (await TaskToTag.find({ tagId: { $eq: tag._id } })).map(e => e.taskId)

  if (!tag)
    return res.sendStatus(404);

  res.send(tag);
});

tags.post("/tags", async function (req: Request, res: Response) {
  const tagName: string = req.body.name;

  if (!tagName)
    return res.sendStatus(400);

  const taskIds = req.body.tasks ?? [];

  try {
    const tasks = await Task.find({ _id: { $in: taskIds } });

    if (tasks.length !== taskIds.length)
      return res.status(400).json({ message: "Invalid task IDs" });

    } catch (e) {
    res.status(500).json({ "Internal server error": e })
  }

  const checkName = await Tag.findOne({ name: { $eq: tagName } })

  if (checkName)
    return res.sendStatus(409);
  
  const newTag = new Tag({
      name: tagName
  });

  await newTag.save();

  for (const taskId of taskIds) {
    const newTaskToTag = new TaskToTag({ 
      tagId: newTag._id,
      taskId: taskId
    });

    newTaskToTag.save();
  }

  res.send(newTag);
});

tags.patch("/tags/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const newName: string = req.body.name;

  const existingTag = await Tag.findById(id);
  
  if (!existingTag)
    return res.sendStatus(404);

  existingTag.name = newName;
  await existingTag.save();
  res.send(existingTag);
});

tags.delete("/tags/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedTag = await Tag.findByIdAndDelete(id);
  deletedTag["_doc"]["tasks"] = [];

  if (!deletedTag)
    return res.sendStatus(404);

  const tagsToTasks = await TaskToTag.find({ tagId: { $eq: deletedTag._id } });

  for (const ttt of tagsToTasks) {
    deletedTag["_doc"]["tasks"].push(ttt.taskId);
    await ttt.deleteOne();
  }

  res.sendStatus(204);
});
