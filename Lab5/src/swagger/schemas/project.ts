/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
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
 *         taskIds:
 *           type: string[]
 *           description: The tasks that belong to this project
 *       example:
 *         id: 5610492a-9f39-4527-9f1c-5b409ad4ef4a
 *         name: Work
 *         taskIds: []
 */
