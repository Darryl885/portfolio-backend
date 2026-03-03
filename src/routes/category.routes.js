const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const auth = require('../middlewares/auth.middleware');

// --- ROUTES PUBLIQUES ---
router.get('/', categoryController.getAll);

// --- ROUTES PROTÉGÉES ---
router.post('/', auth, categoryController.create);
router.delete('/:id', auth, categoryController.delete);

// TRÈS IMPORTANT : L'export pour éviter le crash de app.js
module.exports = router;