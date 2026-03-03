/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Envoyer un message via le formulaire de contact
 *     tags:
 *       - Contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 example: Darryl
 *               email:
 *                 type: string
 *                 example: darryldyvan@gmail.com
 *               message:
 *                 type: string
 *                 example: Bonjour, je souhaite vous contacter.
 *     responses:
 *       200:
 *         description: Email envoyé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Message envoyé avec succès
 */

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

// JUSTE '/' car app.use() a déjà défini '/api/contact'
router.post('/', contactController.sendMail);


module.exports = router;