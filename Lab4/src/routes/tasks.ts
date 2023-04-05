import express, { Request, Response } from 'express';
import { tagsList, tasksList } from '../storage/data';
import { Task } from '../entities/task';

export const tasks = express.Router();

const START_DATE = new Date("2000-01-01");
const END_DATE = new Date("2100-01-01");

tasks.get('/tasks', function (req: Request, res: Response) {
    let tasks = [...tasksList];

    if (req.query)
    {
        tasks = tasks.filter(t => {
            for (const prop in req.query)
            {
                if (t[prop] === undefined)
                    return false;

                if (t[prop] !== req.query[prop])
                    return false;
            }

            return true;
        });
    }

    res.send(tasks);
});


tasks.get('/tasks/:id', function (req: Request, res: Response) {
    const task = tasksList.find(t => t.id === req.params.id);

    if (!task) {
        return res.sendStatus(400);
    }

    res.send(task);
});

tasks.post('/tasks', function (req: Request, res: Response) {
    const taskName: string = req.body.name;
    const taskDiscription: string = req.body.discription ?? "";
    const taskDeadline: Date = req.body.deadline ?? new Date();
    const taskTagIds: string[] = req.body.tagIds;
    if (!taskName) {
        return res.sendStatus(400);
    }
    if (taskDeadline <= START_DATE || taskDeadline >= END_DATE) {
        return res.sendStatus(400);
    }
    const newTask: Task = new Task(taskName, taskDiscription, taskDeadline);
    if (taskTagIds) {
        if (taskTagIds.length !== new Set(taskTagIds).size) {
            return res.sendStatus(400);
        }
        taskTagIds.forEach(id => {
            if (!tagsList.find(tag => tag.id === id)) {
                return res.sendStatus(400);
            }
            newTask.addTag(id);
        });
    }
    tasksList.push(newTask);
    res.sendStatus(201);
});

tasks.put('/tasks/:id', (req: Request, res: Response) => {
    const id: string = req.params.id;
    const newName: string = req.body.name;
    const newDiscription: string = req.body.discription;
    const newDeadline: Date = req.body.deadline;
    const newTagIds: string[] = req.body.tagIds;
    const index: number = tasksList.findIndex(t => t.id === id)
    if (index === -1) return res.sendStatus(404);
    if (newDeadline && (newDeadline <= START_DATE || newDeadline >= END_DATE)) {
        return res.sendStatus(400);
    }
    if (newTagIds) {
        if (newTagIds.length !== new Set(newTagIds).size) {
            return res.sendStatus(400);
        }
        newTagIds.forEach(id => {
            if (!tagsList.find(tag => tag.id === id)) {
                return res.sendStatus(400);
            }
        });
    }
    tasksList[index].name = newName? newName : tasksList[index].name;
    tasksList[index].discription = newDiscription? newDiscription : tasksList[index].discription;
    tasksList[index].deadline = newDeadline? newDeadline : tasksList[index].deadline;
    tasksList[index].tagIds = newTagIds? newTagIds : tasksList[index].tagIds;
    res.sendStatus(200);
});

tasks.delete('/tasks/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const index: number = tasksList.findIndex(t => t.id === id)
    if (index === -1) return res.sendStatus(404);
    tasksList.splice(index, 1);
    res.sendStatus(200);
});
