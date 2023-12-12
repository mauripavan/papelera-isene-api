const express = require("express");
const productsRouter = express.Router();
const { Product } = require("../models");

productsRouter.get("/", (req, res) => {
  Product.findAll().then((result) => res.send(result).status(200));
});

productsRouter.post("/", (req, res) => {
  const {
    description,
    cost,
    pi,
    pp,
    earningPI,
    earningPP,
    stock,
    updatedDate,
    iva,
    quantity,
  } = req.body;
  Product.create({
    description,
    cost,
    earningPI,
    earningPP,
    pi,
    pp,
    stock,
    updatedDate,
    iva,
    quantity,
  }).then((result) => {
    res.send(result).status(201);
  });
});

module.exports = productsRouter;
