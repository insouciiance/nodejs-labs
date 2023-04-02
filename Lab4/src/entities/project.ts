import crypto from 'crypto';

export class Project {
    private _id: string;
    private _name: string;
    private _taskIds: string[];

    constructor(name: string) {
        this._id = crypto.randomUUID();
        this.name = name;
        this._taskIds = [];
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get taskIds(): string[] {
        return this._taskIds;
    }

    set taskIds(value: string[]) {
        this._taskIds = value;
    }

    addTask(taskId: string) {
        this._taskIds.push(taskId);
    }

    removeTask(taskId: string) {
        this._taskIds = this._taskIds.filter(id => id != taskId);
    }
}
