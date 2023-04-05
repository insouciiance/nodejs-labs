import crypto from 'crypto';

export class Project {
    public id: string;
    public name: string;
    public taskIds: string[];

    constructor(name: string) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.taskIds = [];
    }

    addTask(taskId: string) {
        this.taskIds.push(taskId);
    }

    removeTask(taskId: string) {
        this.taskIds = this.taskIds.filter(id => id != taskId);
    }
}
