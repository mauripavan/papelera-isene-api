const express = require('express');

const productsRouter = express.Router();
const { Op } = require('sequelize');
const { Product } = require('../models');

// Get all products
productsRouter.get('/', async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 10;

  try {
    const { count, rows } = await Product.findAndCountAll({
      order: [['description', 'ASC']],
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });

    const totalPages = Math.ceil(count / pageSize);

    res.json({
      data: rows,
      pagination: {
        page,
        pageSize,
        totalItems: count,
        totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Filter products by stock
productsRouter.get('/stock', async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 10;

  try {
    const { count, rows } = await Product.findAndCountAll({
      where: {
        stock: false,
      },
      order: [['description', 'ASC']],
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });

    const totalPages = Math.ceil(count / pageSize);

    res.json({
      data: rows,
      pagination: {
        page,
        pageSize,
        totalItems: count,
        totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Search products
productsRouter.get('/search', async (req, res) => {
  const { query } = req.query;
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 10;

  try {
    if (!query) {
      return res.status(400).json({ error: 'Missing search query' });
    }

    const { count, rows } = await Product.findAndCountAll({
      where: {
        description: {
          [Op.iLike]: `%${query}%`,
        },
      },
      order: [['description', 'ASC']],
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
    const totalPages = Math.ceil(count / pageSize);

    return res.json({
      data: rows,
      pagination: {
        page,
        pageSize,
        totalItems: count,
        totalPages,
      },
    });
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

productsRouter.put('/increment', async (req, res) => {
  const productsToUpdate = req.body;

  try {
    if (!Array.isArray(productsToUpdate)) {
      return res
        .status(400)
        .send('Invalid request format. Expected an array of products.');
    }

    // Extract product ids from the array
    const productIds = productsToUpdate.map((product) => product.id);

    // Check if all products exist
    const existingProducts = await Product.findAll({
      where: {
        id: {
          [Op.in]: productIds,
        },
      },
    });

    if (existingProducts.length !== productIds.length) {
      return res.status(404).send('One or more products not found');
    }

    // Update the products
    for (const {
      id, cost, pi, pp,
    } of productsToUpdate) {
      Product.update(
        { cost, pi, pp },
        {
          where: { id },
        },
      );
    }

    // Fetch the updated products
    const updatedProducts = await Product.findAll({
      where: {
        id: {
          [Op.in]: productIds,
        },
      },
    });

    return res.status(200).send(updatedProducts);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

// Update product price
productsRouter.put('/increment/:id', async (req, res) => {
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

// Update product stock
productsRouter.put('/stock/:id', async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {
    // Check if the product exists
    const existingProduct = await Product.findByPk(id);
    if (!existingProduct) {
      return res.status(404).send('Product not found');
    }
    // Update the product
    await Product.update(
      { stock },
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

// Update product
productsRouter.put('/update/:productId', async (req, res) => {
  const { productId } = req.params;
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

  try {
    const [updatedCount] = await Product.update(
      {
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
      },
      {
        where: { id: productId },
      },
    );

    if (updatedCount === 0) {
      return res.status(404).send('Product not found');
    }

    const updatedProduct = await Product.findByPk(productId);

    return res.status(200).send(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = productsRouter;
