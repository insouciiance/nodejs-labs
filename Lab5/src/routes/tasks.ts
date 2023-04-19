import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Tag from "../models/tag";
import Task from "../models/task";
import Project from "../models/project";
import TaskToTag from "../models/tasksToTags";
import TaskDto from "../dtos/taskDto";

export const tasks = express.Router();

const START_DATE = new Date("2000-01-01");
const END_DATE = new Date("2100-01-01");

tasks.get("/tasks", async function (req: Request, res: Response) {
    try {
        const tasks = await Task.find(req.query);

        const taskDtos = [];

        for (const task of tasks) {
            const tagDocs = await TaskToTag.find({ taskId: { $eq: task._id } });
            const tags = tagDocs.map(e => e.tagId);
            taskDtos.push(new TaskDto(task.id, task.name, task.description, task.project, tags));
        }

        res.json(taskDtos);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

tasks.get("/tasks/:id", async function (req: Request, res: Response) {
    const task = await Task.findById(req.params.id)

    if (!task)
        return res.status(404);

    const tagIds = (await TaskToTag.find({ taskId: { $eq: task._id } })).map(e => e.tagId);
    const taskDto = new TaskDto(task.id, task.name, task.description, task.project, tagIds);

    res.send(taskDto);
});

tasks.post("/tasks", async function (req: Request, res: Response) {
    const taskName: string = req.body.name;
    const taskDeadline: Date = req.body.deadline ?? new Date();
    const projectId: ObjectId = req.body.project;
    const tagIds: string[] = req.body.tags;

    if (!taskName) {
        return res.status(400).json({ message: "Name is required" });
    }
    if (taskDeadline <= START_DATE || taskDeadline >= END_DATE) {
        return res.status(400).json({ message: "Date is incorrect is required" });
    }

    const tags = await Tag.find({ _id: { $in: tagIds } });

    if (tags.length !== tagIds.length)
        return res.status(400).json({ message: "Invalid tag IDs" });

    if (projectId) {
        try {
            const existingProject = await Project.findById(req.body.project);
            if (!existingProject) {
                return res.status(400).json({ message: "Invalid Project ID" });
            }
        } catch (e) {
            res.status(400).json({ "error": e })
        }
    } else {
        return res.status(404).json({ message: "Project ID is empty" });
    }

    const newTask = new Task(req.body);

    await newTask.save();

    const newTaskDto = new TaskDto(newTask.id, newTask.name, newTask.description, newTask.project, tags.map(t => t.id));

    res.json(newTaskDto);
});

tasks.patch("/tasks/:id", async (req: Request, res: Response) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        //TODO: implement check if tags exists

        task.name = req.body.name;
        task.description = req.body.description;
        if (req.body.project) {
            try {
                const existingProject = await Project.findById(req.body.project);
                if (!existingProject) {
                    return res.status(400).json({ message: "Invalid Project ID" });
                }
                task.project = req.body.project;
            } catch (e) {
                res.status(400).json({ "error": e })
            }
        }

        const updatedTask = await task.save();

        res.json(updatedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

tasks.delete("/tasks/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task deleted successfully", deletedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
