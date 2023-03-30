import crypto from 'crypto';

export class Task {
    private _id: string;
    private _name: string;
    private _discription: string;
    private _deadline: Date;
    private _tagIds: string[];

    constructor(name: string, discription: string, deadline: Date) {
        this._id = crypto.randomUUID();
        this._name = name;
        this._discription = discription;
        this._deadline = deadline;
        this._tagIds = [];
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value
    }

    get discription(): string {
        return this._discription;
    }

    set discription(value: string) {
        this._discription = value;
    }

    get deadline(): Date {
        return this._deadline;
    }

    set deadline(value: Date) {
        this._deadline = value;
    }

    get tagIds(): string[] {
        return this._tagIds;
    }

    set tagIds(value: string[]) {
        this._tagIds = value;
    }

    getInfo(): string {
        return "Id: " + this._id + " Name: " + this._name + " Discription: " 
        + this._discription + " Deadline: " + this._deadline.toLocaleDateString();  
    }

    addTag(tagId: string) {
        this._tagIds.push(tagId);
    }

    removeTag(tagId: string) {
        this._tagIds = this._tagIds.filter(id => id != tagId);
    }
}
