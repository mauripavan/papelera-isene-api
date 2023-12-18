const S = require('sequelize');
const db = require('../db');

class Product extends S.Model {}

Product.init(
  {
    description: {
      type: S.STRING,
    },
    cost: {
      type: S.FLOAT,
    },
    pi: {
      type: S.FLOAT,
    },
    pp: {
      type: S.FLOAT,
    },
    earningPI: {
      type: S.INTEGER,
    },
    earningPP: {
      type: S.INTEGER,
    },
    stock: {
      type: S.BOOLEAN,
      defaultValue: true,
    },
    updatedDate: {
      type: S.STRING,
    },
    iva: {
      type: S.BOOLEAN,
      defaultValue: true,
    },
    quantity: {
      type: S.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: 'product',
  },
);

module.exports = Product;
