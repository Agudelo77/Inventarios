const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class CustomerService {
  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash,
      },
    };
    const newCustomer = await models.Customer.create(newData, {
      include: 'user',
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async find() {
    return await models.Customer.findAll({ include: 'user' });
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) throw boom.notFound('customer not found');
    return customer;
  }

  async update(id, changes) {
    const rta = await this.findOne(id);
    rta.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
