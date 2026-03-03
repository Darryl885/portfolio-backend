const { Category } = require('../models');

class CategoryService {
  async getAllCategories() {
    return await Category.findAll({
      order: [['name', 'ASC']]
    });
  }

  async createCategory(data) {
    return await Category.create(data);
  }

  async deleteCategory(id) {
    return await Category.destroy({ where: { id } });
  }
}

module.exports = new CategoryService();