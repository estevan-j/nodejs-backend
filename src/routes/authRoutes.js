const express = require('express');
const { verifyAcc, login, requestResetPassword, resetPassword } = require('../controllers');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: Authentication endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password    
 *       properties:
 *         username:
 *           type: string
 *           minLength: 5
 *           maxLength: 15
 *           description: The username of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user
 *         password:
 *           type: string
 *           minLength: 8
 *           maxLength: 20
 *           description: The password of the user
 *         recovery_email:
 *           type: string
 *           format: email
 *           description: The email to send the recovery link
 *         verified:
 *           type: boolean
 *           default: false
 *           description: The verification status of the user. It's necessary to verify the user before login.
 *         isAdmin:
 *           type: boolean
 *           default: false
 *           description: The admin status of the user
 *       example:
 *         username: johndoe
 *         email: john.doe@outlook.com
 *         password: 12345678
 *         recovery_email: doe.john@outlook.com
 * 
 *     VerifyAcc:
 *       type: object
 *       required:
 *         - email
 *         - verification_code
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user
 *         verification_code:
 *           type: string
 *           description: The verification code sent to the user's email
 *       example:
 *         email: test@gmail.com
 *         verification_code: 123456
 *
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user
 *         password:
 *           type: string
 *           minLength: 8
 *           maxLength: 20
 *           description: The password of the user
 *       example:
 *         email: user1@gmail.com
 *         password: 12345678
 * 
 *     ResetPassword:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user registered in the system
 *       example:
 *         email: requestReset@gmail.com
 * 
 *     NewPassword:
 *       type: object
 *       required:
 *         - password
 *         - verification_code
 *       properties:
 *         password:
 *           type: string
 *           minLength: 8
 *           maxLength: 20
 *           description: The new password of the user
 *         verification_code:
 *           type: string
 *           description: The verification code sent to the user's email
 *       example:
 *         password: newpassword123
 *         verification_code: 654321
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT authorization scheme to access protected routes
 * 
 * responses:
 *   UnauthorizedError:
 *     description: Unauthorized access to the resource
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: integer
 *               example: 401
 *             message:
 *               type: string
 *               example: Unauthorized access to the resource, token invalid or expired
 */


/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Login user
 *     description: Login user with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 
 *                 message:
 *                   type: string
 *                   example: 
 *       400:
 *         description: Invalid data, or user not registered
 *       404:
 *         description: User not found
 */
router.post('/login', login);

/**
 * @swagger
 * /api/v1/auth/verifyAcc:
 *   post:
 *     tags: [Authentication]
 *     summary: Verify user account
 *     description: Verify user account with email and verification code
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyAcc'
 *     responses:
 *       200:
 *         description: User account verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 
 *                 message:
 *                   type: string
 *                   example: 
 *       400:
 *         description: Invalid data, or user not registered
 *       404:
 *         description: User not found
 *       409:
 *         description: User already verified, or verification code not found
 *       500:
 *         description: Internal server error
 */
router.post('/verifyAcc', verifyAcc);

/**
 * @swagger
 * /api/v1/auth/request-reset-password:
 *   post:
 *     tags: [Authentication]
 *     summary: Request password reset
 *     description: Request password reset with email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
 *     responses:
 *       200:
 *         description: Verification code sent to the user's email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 
 *                 message:
 *                   type: string
 *                   example: 
 *       400:
 *         description: Invalid email format
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/request-reset-password', requestResetPassword);

/**
 * @swagger
 * /api/v1/auth/reset-password/{email}:
 *   patch:
 *     tags: [Authentication]
 *     summary: Reset password
 *     description: Reset password with email and verification code
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: The email of the user
 *         schema:
 *           type: string
 *           format: email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewPassword'
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 
 *                 message:
 *                   type: string
 *                   example: 
 *       400:
 *         description: Invalid data, or user not registered
 *       404:
 *         description: User not found
 *       409:
 *         description: Verification code not found or expired
 *       500:
 *         description: Internal server error
 */
router.patch('/reset-password/:email', resetPassword);

module.exports = router;