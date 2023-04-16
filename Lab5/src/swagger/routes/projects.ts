/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: The projects managing API
 * /projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: The list of projects was returned.
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Project"
 *     responses:
 *       201:
 *         description: The project was created.
 *       400:
 *         description: Bad or insufficient arguments provided
 *       500:
 *         description: Some server error
 * /projects/{id}:
 *   get:
 *     summary: Get a project by id
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project id
 *     responses:
 *       200:
 *         description: The project with the given id was returned.
 *       404:
 *         description: The project with the given id was not found.
 *   patch:
 *     summary: Modify a project with a given id
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Project"
 *     responses:
 *       200:
 *         description: The project was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Project"
 *       400:
 *         description: The provided data for the project was invalid
 *       404:
 *         description: The project was not found
 *       500:
 *         description: Some error happened
 *   delete:
 *     summary: Remove the project by id
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The project id
 *
 *     responses:
 *       204:
 *         description: The project was deleted
 *       404:
 *         description: The project was not found
 */
