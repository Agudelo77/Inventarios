const express = require('express');

const ProductService = require('../services/product.service');

const router = express.Router();
const service = new ProductService();
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require('./../schemas/product.schema');

router.get(
  '/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      res.json(await service.findOne(req.id));
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.json(await service.create(body));
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),

  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
