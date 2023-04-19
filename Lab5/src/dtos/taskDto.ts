import { ObjectId } from "mongodb";

class TaskDto {
    public id: string;

    public name: string;

    public description: string;

    public project: ObjectId;

    public tags: ObjectId[];

    constructor(id: string, name: string, description: string, project: ObjectId, tags: ObjectId[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.project = project;
        this.tags = tags;
    }
}

export default TaskDto;
