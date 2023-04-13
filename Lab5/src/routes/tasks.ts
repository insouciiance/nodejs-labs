import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
const Task = require('../models/task');
const Project = require('../models/project');

export const tasks = express.Router();

const START_DATE = new Date("2000-01-01");
const END_DATE = new Date("2100-01-01");

tasks.get('/tasks', async function (req: Request, res: Response) {
    try {
        const projects = await Task.find(req.query);
        res.json(projects);
      } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
});

tasks.get('/tasks/:id', async function (req: Request, res: Response) {
    const project = await Task.findById(req.params.id)
    if (!project) {
        return res.status(404);
    }
    res.send(project);
});

tasks.post('/tasks', async function (req: Request, res: Response) {
    const taskName: string = req.body.name;
    const taskDeadline: Date = req.body.deadline ?? new Date();
    const projectId: ObjectId = req.body.project;
    const taskTagIds: string[] = req.body.tagIds;
    if (!taskName) {
        return res.status(400).json({message: "Name is required"});
    }
    if (taskDeadline <= START_DATE || taskDeadline >= END_DATE) {
        return res.status(400).json({message: "Date is incorrect is required"});
    }

    if(projectId){
        try {
            const existingProject = await Project.findById(req.body.project);
            if(!existingProject){
                return res.status(400).json({ message: "Invalid Project ID" });
            }
        } catch (e) {
            res.status(400).json({"error": e})
        }
    }else{
        return res.status(404).json({ message: "Project ID is empty" });    
    }

    //TODO: implement check if tags exists

    const newTask = new Task(req.body);

    await newTask.save();
    res.json(newTask);
});

tasks.patch('/tasks/:id', async ( req: Request, res: Response) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        //TODO: implement check if tags exists

        task.name = req.body.name;
        task.description = req.body.description;
        if(req.body.project){
            try {
                const existingProject = await Project.findById(req.body.project);
                if(!existingProject){
                    return res.status(400).json({ message: "Invalid Project ID" });
                }
                task.project = req.body.project;
            } catch (e) {
                res.status(400).json({"error": e})
            }
        }
        
        const updatedTask = await task.save();

        res.json(updatedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

tasks.delete('/tasks/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully', deletedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
