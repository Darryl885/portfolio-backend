/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion de l'administrateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@portfolio.com
 *               password:
 *                 type: string
 *                 example: motdepasse123
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne un token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */


const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Vérifie que authController.login existe aussi !
router.post('/login', authController.login);

// TRÈS IMPORTANT :
module.exports = router;