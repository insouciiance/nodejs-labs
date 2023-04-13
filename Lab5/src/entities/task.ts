import crypto from 'crypto';

export class Task {
    public id: string;
    public name: string;
    public description: string;
    public deadline: Date;
    public tagIds: string[];

    constructor(name: string, discription: string, deadline: Date) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.description = discription;
        this.deadline = deadline;
        this.tagIds = [];
    }

    getInfo(): string {
        return "Id: " + this.id + " Name: " + this.name + " Discription: " 
        + this.description + " Deadline: " + this.deadline.toLocaleDateString();  
    }

    addTag(tagId: string) {
        this.tagIds.push(tagId);
    }

    removeTag(tagId: string) {
        this.tagIds = this.tagIds.filter(id => id != tagId);
    }
}
