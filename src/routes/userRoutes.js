const express = require('express');
const { getUser, getAllUsers, createUser, updateUser, deleteUser, getUserByEmail, updatePatchUser } = require('../controllers');
const { authToken } = require('../config/jwt');
const router = express.Router();

/**
 *  @swagger
 *  tags:
 *    name: User
 *    description: User endpoints
 */

/**
 * @swagger
 * /users/{user}:
 *   get:
 *     summary: "Get user details"
 *     description: "Retrieve user details by username"
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         schema:
 *           type: string
 *         description: "Username of the registered user"
 *     responses:
 *       200:
 *         description: "User details retrieved successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: "Unauthorized"
 *       404:
 *         description: "User not found"
 *       500:
 *         description: "Internal server error"
 */
router.get('/:user', getUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: "Get all users"
 *     description: "Retrieve a list of all users"
 *     tags: [User]
 *     responses:
 *       200:
 *         description: "List of users retrieved successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: "Unauthorized"
 *       500:
 *         description: "Internal server error"
 */
router.get('/', getAllUsers);

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: "Get user by email"
 *     description: "Retrieve user details by email"
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: "Email of the registered user"
 *     responses:
 *       200:
 *         description: "User details retrieved successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: "User not found"
 *       500:
 *         description: "Internal server error"
 */
router.get('/email/:email?', getUserByEmail);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: "Create a new user"
 *     description: "Add a new user to the system"
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: "User created successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: "Invalid input data"
 *       409:
 *         description: "Email or username already exists"
 *       500:
 *         description: "Internal server error"
 */
router.post('', authToken, createUser);

/**
 * @swagger
 * /users/{user}:
 *   put:
 *     summary: "Update user details"
 *     description: "Update the details of an existing user by username"
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         schema:
 *           type: string
 *         description: "Username of the user to update"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: "User updated successfully"
 *       400:
 *         description: "Invalid input data"
 *       404:
 *         description: "User not found"
 *       500:
 *         description: "Internal server error"
 */
router.put('/:user', authToken, updateUser);

/**
 * @swagger
 * /users/{user}:
 *   patch:
 *     summary: "Partially update user details"
 *     description: "Update specific fields of a user by username"
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         schema:
 *           type: string
 *         description: "Username of the user to update"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: "User updated successfully"
 *       400:
 *         description: "Invalid input data"
 *       404:
 *         description: "User not found"
 *       500:
 *         description: "Internal server error"
 */
router.patch('/:user', authToken, updatePatchUser);

/**
 * @swagger
 * /users/{user}:
 *   delete:
 *     summary: "Delete a user"
 *     description: "Remove a user from the system by username"
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         schema:
 *           type: string
 *         description: "Username of the user to delete"
 *     responses:
 *       200:
 *         description: "User deleted successfully"
 *       404:
 *         description: "User not found"
 *       500:
 *         description: "Internal server error"
 */
router.delete('/:user', authToken, deleteUser);

module.exports = router;