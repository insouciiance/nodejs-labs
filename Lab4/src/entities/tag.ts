import crypto from 'crypto';

export class Tag {
    private _id: string;
    private _name: string;

    constructor(name: string) {
        this._id = crypto.randomUUID();
        this._name = name;
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
    
    getInfo(): string {
        return "Id: " + this._id + " Name: " + this._name;  
    }
}
