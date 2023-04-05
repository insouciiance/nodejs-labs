/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: The tags managing API
 * /tags:
 *   get:
 *     summary: Get all tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: The list of tags was returned.
 *   post:
 *     summary: Create a new tag
 *     tags: [Tags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       201:
 *         description: The tag was created.
 *       400:
 *         description: Bad or insufficient arguments provided
 *       500:
 *         description: Some server error
 * /tags/{id}:
 *   get:
 *     summary: Get a tag by id
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tag id
 *     responses:
 *       200:
 *         description: The tag with the given id was returned.
 *       404:
 *         description: The tag with the given id was not found.
 *   patch:
 *     summary: Modify a tag with a given id
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tag id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tag'
 *     responses:
 *       200:
 *         description: The tag was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       400:
 *         description: The provided data for the tag was invalid
 *       404:
 *         description: The tag was not found
 *       500:
 *         description: Some error happened
 *   delete:
 *     summary: Remove the tag by id
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tag id
 *
 *     responses:
 *       204:
 *         description: The tag was deleted
 *       404:
 *         description: The tag was not found
 */
