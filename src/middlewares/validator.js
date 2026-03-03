const Joi = require('joi');

const projectSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  // On aligne Joi sur les noms du modèle Sequelize :
  image_url: Joi.string().uri().allow('').allow(null), 
  link_github: Joi.string().uri().allow('').allow(null),
  link_demo: Joi.string().uri().allow('').allow(null),
  categoryId: Joi.number().integer().required()
});

const validateProject = (req, res, next) => {
  const { error } = projectSchema.validate(req.body);
  if (error) {
    console.log("Erreur Joi détaillée :", error.details); // Super important pour le debug !
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};

module.exports = { validateProject };