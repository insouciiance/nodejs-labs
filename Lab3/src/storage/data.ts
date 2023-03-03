import { Task } from "../entities/task";
import { Priority } from "../enums/priority";

export const tasksList = [
    new Task("Текст першої задачі", Priority.Low, new Date()),
    new Task("Текст другої задачі", Priority.Medium, new Date()),
    new Task("Текст третьої задачі", Priority.High, new Date()),
  ];