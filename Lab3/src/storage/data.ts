import { Task } from "../entities/task";
import { Priority } from "../enums/priority";

export const tasksList = [
    new Task("Текст першої задачі", 0, new Date()),
    new Task("Текст другої задачі", 1, new Date()),
    new Task("Текст третьої задачі", 2, new Date()),
  ];