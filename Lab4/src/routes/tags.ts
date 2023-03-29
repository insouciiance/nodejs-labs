import express, { Request, Response } from 'express';
import { tagsList } from '../storage/data';
import { Tag } from '../entities/tag';
export const tags = express.Router();

tags.get('/tags', function (req: Request, res: Response) {
    const tags = [...tagsList];
    res.send(tags);
});


tags.get('/tags/:id', function (req: Request, res: Response) {
    const tag = tagsList.find(x => x.id === req.params.id);

    if (!tag) {
        return res.sendStatus(400);
    }

    res.send(tag);
});

tags.post('/tags', function (req: Request, res: Response) {
    const tagName: string = req.body.name;

    if (!tagName) {
        return res.sendStatus(400);
    }

    const checkName = tagsList.find(t => t.name === tagName)
    if (checkName) return res.sendStatus(409);
    const newTask: Tag = new Tag(tagName);
    tagsList.push(newTask);

    res.sendStatus(201);
});

tags.put('/tags/:id', (req: Request, res: Response) => {
    const id: string = req.params.id;
    const newName: string = req.body.name;
    const index: number = tagsList.findIndex(item => item.id === id)
    if (index === -1) return res.sendStatus(404);
    tagsList[index].name = newName;
    res.sendStatus(200);
});

tags.delete('/tags/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const index: number = tagsList.findIndex(item => item.id === id)
    if (index === -1) return res.sendStatus(404);
    tagsList.splice(index, 1);
    res.sendStatus(200);
});
