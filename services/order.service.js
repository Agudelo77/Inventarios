const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {
  async create(data) {
      const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    return await models.Order.findAll();
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items'
      ],
    });
    if (!order) throw boom.notFound('Order not found');
    return order;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id': userId,
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });
    return orders;
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

module.exports = OrderService;
