const BASE_URL = "http://localhost:3000/api/products";

/**
 * Fetches all products from the API
 * @returns {Promise<Array>} Array of products
 */
export async function getAllProducts() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Fetches a single product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export async function getProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

/**
 * Creates a new product
 * @param {Object} productData - Product data
 * @returns {Promise<Object>} Created product
 */
export async function createProduct(productData) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

/**
 * Updates an existing product
 * @param {number} id - Product ID
 * @param {Object} productData - Updated product data
 * @returns {Promise<Object>} Updated product
 */
export async function updateProduct(id, productData) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error(`Failed to update product with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

/**
 * Deletes a product
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export async function deleteProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete product with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}