// src/controllers/project.controller.js
const projectService = require('../services/project.service');

// 1. Vérifie bien l'orthographe de "exports.getAll"
exports.getAll = async (req, res, next) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

// 2. Vérifie "exports.getOne"
exports.getOne = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// 3. Vérifie "exports.create"
// exports.create = async (req, res, next) => {
//   try {
//     const newProject = await projectService.createProject(req.body);
//     res.status(201).json({ success: true, data: newProject });
//   } catch (error) {
//     next(error);
//   }
// };
exports.create = async (req, res, next) => {
  try {
    const projectData = {
      ...req.body,
      // On construit l'URL de l'image pour qu'elle soit accessible
      image: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
    };
    const newProject = await projectService.createProject(projectData);
    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    next(error);
  }
};
// 4. Vérifie "exports.update"
exports.update = async (req, res, next) => {
  try {
    const updated = await projectService.updateProject(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// 5. Vérifie "exports.delete"
exports.delete = async (req, res, next) => {
  try {
    await projectService.deleteProject(req.params.id);
    res.status(200).json({ success: true, message: "Projet supprimé" });
  } catch (error) {
    next(error);
  }
};