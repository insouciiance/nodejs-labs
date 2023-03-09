import { Priority } from '../enums/priority'

export class Task {
    private _text: string;
    private _priority: Priority;
    private _date: Date
    private _isDone: boolean = false;

    constructor(text: string, priority: Priority, date: Date) {
        this._text = text;
        this._priority = priority;
        this._date = date;
    }

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }

    get priority(): Priority {
        return this._priority;
    }

    set priority(value: Priority) {
        this._priority = value;
    }

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }


    get isDone(): boolean {
        return this._isDone;
    }

    set isDone(value: boolean) {
        this._isDone = value;
    }

    getInfo(): string {
        return this.text + ' ' + this.priority + ' ' + this.date.toLocaleString()
    }
}
