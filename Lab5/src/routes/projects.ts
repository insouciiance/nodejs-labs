import express, { Request, Response } from "express";
import Project from "../models/project";
import Task from "../models/task";
import ProjectDto from "../dtos/projectDto";

export const projects = express.Router();

projects.get("/projects", function (req: Request, res: Response) {
    const pageNumber: number = Number(req.query.page) || 1;
    const itemsPerPage: number = Number(req.query.items_per_page) || 10;
    const startIndex: number = (pageNumber - 1) * itemsPerPage;
    Project.find().skip(startIndex).limit(itemsPerPage)
        .then(projects => {
            res.send(projects.map(p => new ProjectDto(p.id, p.name)));
        }).catch(err => {
            res.send(err);
        });
});

projects.get("/projects/:id", async function (req: Request, res: Response) {
    const project = await Project.findById(req.params.id)

    if (!project)
        return res.sendStatus(404);

    res.send(new ProjectDto(project.id, project.name));
});

projects.post("/projects", async function (req: Request, res: Response) {
    const taskIds = req.body.tasks;
    if (req.body.tasks) {
        try {
            const tasks = await Task.find({ _id: { $in: taskIds } });
            if (tasks.length !== taskIds.length) {
                return res.status(400).json({ message: "Invalid task IDs" });
            }
        } catch (e) {
            res.status(400).json({ "error": e })
        }

    }
    const project = new Project(req.body);
    await project.save();
    res.json(new ProjectDto(project.id, project.name));
});

projects.patch("/projects/:id", async (req: Request, res: Response) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project)
            return res.status(404).json({ message: "Project not found" });

        project.name = req.body.name;

        const updatedProject = await project.save();

        res.json(new ProjectDto(updatedProject.id, updatedProject.name));
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

projects.delete("/projects/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject)
            return res.status(404).json({ message: "Project not found" });

        res.send(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
