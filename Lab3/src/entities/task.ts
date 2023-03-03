import internal from "stream";
import {Priority} from '../enums/priority'

export class Task{
    text: string;
    priority: Priority;
    date: Date

    constructor(text:string, priority: Priority, date: Date){
        this.text = text;
        this.priority = priority;
        this.date = date;
    }
    getInfo(): string{
        return this.text + ' ' + this.priority + ' ' + this.date.toLocaleString()
    }
}