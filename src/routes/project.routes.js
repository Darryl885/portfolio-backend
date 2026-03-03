/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré
 *         title:
 *           type: string
 *           description: Titre du projet
 *         description:
 *           type: string
 *           description: Description détaillée
 *         imageUrl:
 *           type: string
 *           description: URL de l’image
 *         githubUrl:
 *           type: string
 *           description: Lien GitHub
 *         demoUrl:
 *           type: string
 *           description: Lien de démonstration
 *       example:
 *         id: 1
 *         title: Mon Portfolio
 *         description: Un projet génial
 *         imageUrl: https://photo.com/img.jpg
 *         githubUrl: https://github.com/user/repo
 *         demoUrl: https://demo.com
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Récupérer tous les projets
 *     tags:
 *       - Projects
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const  {validateProject} = require('../middlewares/validator')
const auth = require('../middlewares/auth.middleware');

// --- ROUTES PUBLIQUES ---
// Tout le monde peut voir tes projets
// Ligne 9 : Vérifie que .getAll correspond au nom dans le controller
router.get('/', projectController.getAll);
router.get('/:id', projectController.getOne);

// --- ROUTES PROTÉGÉES (Admin uniquement) ---
// On ajoute le middleware 'auth' avant le controller
router.post('/', auth, validateProject, projectController.create);
router.put('/:id', auth, projectController.update);
router.delete('/:id', auth, projectController.delete);

// TRÈS IMPORTANT : L'export pour éviter le crash de app.js
module.exports = router;


