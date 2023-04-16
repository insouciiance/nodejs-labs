import express, { Request, Response } from "express";
import Tag from "../models/tag";
import Task from "../models/task";

export const tags = express.Router();

tags.get("/tags", async function (req: Request, res: Response) {
  try {
    const tags = await Tag.find(req.query);
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

tags.get("/tags/:id", async function (req: Request, res: Response) {
  const tag = await Tag.findById(req.params.id);

  if (!tag) {
    return res.sendStatus(404);
  }

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

  console.log(checkName);

  if (checkName)
    return res.sendStatus(409);
  
  const newTag = new Tag({
      name: tagName,
      tasks: taskIds
  });

  await newTag.save();
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

  if (!deletedTag)
    return res.sendStatus(404);

  res.sendStatus(204);
});
