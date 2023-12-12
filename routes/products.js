const express = require('express');

const productsRouter = express.Router();
const { Op } = require('sequelize');
const { Product } = require('../models');

// Get all products
productsRouter.get('/', async (req, res) => {
  Product.findAll()
    .then((result) => res.send(result).status(200))
    .catch((error) => {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    });
});

// Search products
productsRouter.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    if (!query) {
      return res.status(400).json({ error: 'Missing search query' });
    }

    const matchedProducts = await Product.findAll({
      where: {
        description: {
          [Op.iLike]: `%${query}%`,
        },
      },
    });

    return res.json({ matchedProducts });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

// Get single product
productsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).send('Product not found');
    }
    return res.status(200).send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

// Create product
productsRouter.post('/', (req, res) => {
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
  })
    .then((result) => {
      res.send(result).status(201);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    });
});

// Delete product
productsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const rowsAffected = await Product.destroy({
      where: { id },
    });
    if (rowsAffected === 0) {
      // Item not found
      return res.status(404).send('Item not found');
    }
    // Item deleted successfully
    return res.status(200).send('Product deleted');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

// Update product price
productsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { cost, pi, pp } = req.body;

  try {
    // Check if the product exists
    const existingProduct = await Product.findByPk(id);

    if (!existingProduct) {
      return res.status(404).send('Product not found');
    }

    // Update the product
    await Product.update(
      { cost, pi, pp },
      {
        where: { id },
      },
    );

    // Fetch the updated product
    const updatedProduct = await Product.findByPk(id);

    return res.status(200).send(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = productsRouter;
