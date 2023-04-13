import { Project } from "../entities/project";
import { Tag } from "../entities/tag";
import { Task } from "../entities/task";

export const projectsList = [
    new Project("Tasks for 2023"),
    new Project("University tasks")
];

export const tagsList = [
    new Tag("Work"),
    new Tag("Personal"),
    new Tag("Education")
];

let today = new Date();
let nextWeek = new Date();
nextWeek.setDate(today.getDate() + 7);
let nextYear = new Date();
nextYear.setDate(today.getDate() + 365);

let task1 = new Task("4 lab", "Finish fourth node js lab work", nextWeek);
task1.addTag(tagsList[2].id);
projectsList[1].addTask(task1.id);

let task2 = new Task("WoT", "To clean Danila's tank hangar so that there is a penetration", today);
task2.addTag(tagsList[1].id);
projectsList[0].addTask(task2.id);

let task3 = new Task("Gym", "Become a boss of the gym", nextYear);
task3.addTag(tagsList[0].id);
task3.addTag(tagsList[2].id);
projectsList[0].addTask(task3.id);

export const tasksList = [
  task1,
  task2,
  task3
]
