/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the tag
 *         name:
 *           type: string
 *           description: The name of your tag
 *     
 *       example:
 *         id: 5610492a-9f39-4527-9f1c-5b409ad4ef4a
 *         name: Work
 */
import { Tag } from "../entities/tag";
import { Task } from "../entities/task";

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
let task2 = new Task("WoT", "To clean Danila's tank hangar so that there is a penetration", today);
task2.addTag(tagsList[1].id);
let task3 = new Task("Gym", "Become a boss of the gym", nextYear);
task3.addTag(tagsList[0].id);
task3.addTag(tagsList[2].id);

export const tasksList = [
  task1,
  task2,
  task3
]