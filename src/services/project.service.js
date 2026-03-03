const { Project, Category, Technology } = require('../models');

class ProjectService {
  // Récupérer tout avec les relations
  async getAllProjects() {
    return await Project.findAll({
      include: [
        { model: Category, as: 'category' },
        { model: Technology, as: 'technologies' }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  async getProjectById(id) {
    const project = await Project.findByPk(id, {
      include: [
        { model: Category, as: 'category' },
        { model: Technology, as: 'technologies' }
      ]
    });
    if (!project) throw new Error('Projet non trouvé');
    return project;
  }

  async createProject(data) {
    // data contient les champs du projet (title, description, etc.)
    return await Project.create(data);
  }

  async updateProject(id, data) {
    const project = await Project.findByPk(id);
    if (!project) throw new Error('Projet non trouvé');
    return await project.update(data);
  }

  async deleteProject(id) {
    const project = await Project.findByPk(id);
    if (!project) throw new Error('Projet non trouvé');
    return await project.destroy();
  }
}

module.exports = new ProjectService();