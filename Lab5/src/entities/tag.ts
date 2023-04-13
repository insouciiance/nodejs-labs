import crypto from 'crypto';

export class Tag {
    public id: string;
    public name: string;

    constructor(name: string) {
        this.id = crypto.randomUUID();
        this.name = name;
    }
    
    getInfo(): string {
        return "Id: " + this.id + " Name: " + this.name;  
    }
}
