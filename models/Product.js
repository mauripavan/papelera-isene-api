const S = require("sequelize");
const db = require("../db");

class Product extends S.Model {}

Product.init(
  {
    description: {
      type: S.STRING,
    },
    cost: {
      type: S.INTEGER,
    },
    pi: {
      type: S.INTEGER,
    },
    pi: {
      type: S.INTEGER,
    },
    earningPI: {
      type: S.INTEGER,
    },
    earningPP: {
      type: S.INTEGER,
    },
    stock: {
      type: S.BOOLEAN,
    },
    updatedDate: {
      type: S.STRING,
    },
    iva: {
      type: S.BOOLEAN,
    },
    quantity: {
      type: S.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: "product",
  }
);

module.exports = Product;
