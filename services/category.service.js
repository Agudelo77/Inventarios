const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CategoryService {
  async create(data) {
    return await models.Category.create(data);
  }

  async find() {
    return await models.Category.findAll({ include: 'products' });
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async update(id, changes) {
    const rta = await this.findOne(id);
    await rta.update(changes);
    return rta;
  }

  async delete(id) {
    const rta = await this.findOne(id);
    await rta.destroy();
    return { id };
  }
}

module.exports = CategoryService;
