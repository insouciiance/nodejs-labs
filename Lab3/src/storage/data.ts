import { Task } from "../entities/task";
import { Priority } from "../enums/priority";

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const now = new Date();

export const tasksList = [
    new Task("Текст першої задачі", Priority.High, now),
    new Task("Текст другої задачі", Priority.Low, addDays(now, 1)),
    new Task("Текст третьої задачі", Priority.Medium, addDays(now, -5)),
  ];