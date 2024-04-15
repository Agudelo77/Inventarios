'use strict';

const { USER_TABLE, UserSchema } = require('./../models/user.model');
const {
  CUSTOMER_TABLE,
  CustomerSchema,
} = require('./../models/customer.model');
const {
  CATEGORY_TABLE,
  CategorySchema,
} = require('./../models/category.model');
const { PRODUCT_TABLE, ProductSchema } = require('./../models/product.model');
const { ORDER_TABLE, OrderSchema } = require('./../models/order.model');
const {
  ORDER_PRODUCT_TABLE,
  OrderProductSchema,
} = require('./../models/order-product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },

  async down(queryInterface, Sequelize) {

  },
};
