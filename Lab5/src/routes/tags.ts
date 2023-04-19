import express, { Request, Response } from "express";
import Tag from "../models/tag";
import Task from "../models/task";
import TaskToTag from "../models/tasksToTags";
import TagDto from "../dtos/tagDto";
import { getOrSetCache } from "../redis/redis";

export const tags = express.Router();

tags.get("/tags", async function (req: Request, res: Response) {
  try {
    const tags: any = await getOrSetCache('tags', async () => {
      return await Tag.find(req.query);
    })

    const tagDtos = [];

    for(const tag of tags) {
      const taskDocs = await TaskToTag.find({ tagId: { $eq: tag._id } });
      const tasks = taskDocs.map(e => e.taskId);
      tagDtos.push(new TagDto(tag.id, tag.name, tasks));
    }

    res.json(tagDtos);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

tags.get("/tags/:id", async function (req: Request, res: Response) {
  try {
    const tag: any = await getOrSetCache(`tags:id=${req.params.id}`, async () => {
      return await Tag.findById(req.params.id);
    });
    const taskIds = (await TaskToTag.find({ tagId: { $eq: tag._id } })).map(e => e.taskId);
    const tagDto = new TagDto(tag.id, tag.name, taskIds);
  
    if (!tag)
      return res.sendStatus(404);
  
    res.send(tagDto);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
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

  const newTagDto = new TagDto(newTag.id, newTag.name, taskIds);

  res.send(newTagDto);
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
