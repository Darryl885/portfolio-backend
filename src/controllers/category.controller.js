const { Category } = require('../models');

exports.getAll = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await Category.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: "Catégorie supprimée" });
  } catch (error) {
    next(error);
  }
};