const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class UserService {
  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({ ...data, password: hash });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    return await models.User.findAll();
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email },
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) throw boom.notFound('User not found');
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    user.update(changes);
    return user;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}
module.exports = UserService;
