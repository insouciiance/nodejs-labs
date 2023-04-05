/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - name
 *         - deadline
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the task
 *         name:
 *           type: string
 *           description: The name of your task
 *         discription:
 *           type: string
 *           description: The task's description
 *         deadline:
 *           type: string
 *           format: date
 *           description: The task's deadline
 *         tagIds:
 *           type: string[]
 *           description: The list of tags associated with this task
 *       example:
 *         id: 36b8f84d-df4e-4d49-b662-bcde71a8764f
 *         name: Wash dishes
 *         discription: Use water to wash dishes
 *         deadline: 2020-03-10T04:05:06.1857Z
 *         tagIds: []
 */
