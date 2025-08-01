import Product from '../models/product.js';

async function getProducts(req, res) {
  try {
    const page = parseInt(req.query.page)|| 1;
    const limit = parseInt(req.query.limit)||10;
    const skip =(page-1)*limit;


    const products = await Product.find()
    .populate('category')
    .skip(skip)
    .limit(limit)
    .sort({ name: 1 });

    const totalResults = await Product.countDocuments();
    const totalPages =Math.ceil(totalResults/limit);

    res.json({products,
      pagination:{
        currentPage: page,
        totalPages,
        totalResults,
        hasNext: page<totalPages,
        hasPrev: page>1,
      }

    });
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function getProductById(req, res) {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function getProductByCategory(req, res) {
  try {
    const id = req.params.idCategory;
    const products = await Product.find({ category: id }).sort({ name: 1 });
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }
    res.json(products);
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function createProduct(req, res) {
  try {
    const { name, description, price,
      stock, imagesUrl, category } = req.body;
    if (!name || !description || !price || !stock
      || !imagesUrl || !category) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    const newProduct = await Product.create({
      name, description, price,
      stock, imagesUrl, category
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price,
      stock, imagesUrl, category } = req.body;
    if (!name || !description || !price || !stock
      || !imagesUrl || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const updatedProduct = await Product.findByIdAndUpdate(id,
      {
        name, description, price,
        stock, imagesUrl, category
      }, { new: true });

    if (updatedProduct) {
      return res.status(200).json(updatedProduct);
    } else {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (deletedProduct) {
      return res.status(204).send();
    } else {
      return res.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export {
  getProducts,
  getProductById,
  getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};