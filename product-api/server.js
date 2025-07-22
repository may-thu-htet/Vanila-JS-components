const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'products.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read the database
async function readDatabase() {
  const data = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(data);
}

// Helper function to write to the database
async function writeDatabase(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const db = await readDatabase();
    res.json(db.products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

// GET a single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const db = await readDatabase();
    const product = db.products.find(p => p.id === id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
});

// POST a new product
app.post('/api/products', async (req, res) => {
  try {
    const db = await readDatabase();
    const newProduct = req.body;
    
    // Find the next available ID
    const maxId = db.products.length > 0 
      ? Math.max(...db.products.map(p => p.id)) 
      : -1;
    
    newProduct.id = maxId + 1;
    
    // Set creation and update timestamps
    const now = new Date().toISOString();
    newProduct.creationAt = now;
    newProduct.updatedAt = now;
    
    db.products.push(newProduct);
    await writeDatabase(db);
    
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT (update) a product
app.put('/api/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const db = await readDatabase();
    const index = db.products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const updatedProduct = {
      ...db.products[index],
      ...req.body,
      id: id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };
    
    db.products[index] = updatedProduct;
    await writeDatabase(db);
    
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE a product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const db = await readDatabase();
    const initialLength = db.products.length;
    
    db.products = db.products.filter(p => p.id !== id);
    
    if (db.products.length === initialLength) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    await writeDatabase(db);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});