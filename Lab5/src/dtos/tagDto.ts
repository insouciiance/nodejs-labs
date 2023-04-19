import { ObjectId } from "mongodb";

class TagDto {
    public id: string;

    public name: string;

    public tasks: ObjectId[];

    constructor(id: string, name: string, tasks: ObjectId[]) {
        this.id = id;
        this.name = name;
        this.tasks = tasks;
    }
}

export default TagDto;
