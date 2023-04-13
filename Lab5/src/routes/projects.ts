import express, { Request, Response } from 'express';
import { projectsList, tasksList } from '../storage/data';
const Project = require('../models/project');
const Task = require('../models/task');

export const projects = express.Router();

projects.get('/projects', function (req: Request, res: Response) {
    const pageNumber: number = Number(req.query.page) || 1;
    const itemsPerPage: number = Number(req.query.items_per_page) || 10;
    const startIndex: number = (pageNumber - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;
    const projects = projectsList.slice(startIndex, endIndex);
    res.send(projects);
});

projects.get('/projects/:id', function (req: Request, res: Response) {
    const project = projectsList.find(p => p.id === req.params.id);

    if (!project) {
        return res.sendStatus(404);
    }

    res.send(project);
});

projects.post('/projects', async function (req: Request, res: Response) {
    const project = new Project(req.body);
    await project.save();
    res.json(project);
});

projects.patch('/projects/:id', (req: Request, res: Response) => {
    const id: string = req.params.id;
    const newName: string = req.body.name;
    const newTaskIds: string[] = req.body.tagIds;
    const index: number = projectsList.findIndex(p => p.id === id)
    
    if (index === -1)
        return res.sendStatus(404);

    if (newTaskIds) {
        if (newTaskIds.length !== new Set(newTaskIds).size) {
            return res.sendStatus(400);
        }

        newTaskIds.forEach(id => {
            if (!tasksList.find(t => t.id === id)) {
                return res.sendStatus(400);
            }
        });
    }

    const updated = projectsList[index];
    updated.name = newName ? newName : projectsList[index].name;
    updated.taskIds = newTaskIds ? newTaskIds : projectsList[index].taskIds;
    res.send(updated);
});

projects.delete('/projects/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const index: number = tasksList.findIndex(t => t.id === id)
    if (index === -1) return res.sendStatus(404);
    tasksList.splice(index, 1);
    res.sendStatus(204);
});
