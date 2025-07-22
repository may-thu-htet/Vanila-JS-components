# Product API Server

A simple CRUD API server using Node.js and Express with a JSON file as the database.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

   For development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## Product Schema

```json
{
  "id": 0,
  "title": "Product Title",
  "slug": "product-slug",
  "price": 99,
  "description": "Product description...",
  "category": {
    "id": 1,
    "name": "Category Name",
    "slug": "category-slug",
    "image": "https://example.com/image.jpg",
    "creationAt": "2025-07-22T12:51:16.000Z",
    "updatedAt": "2025-07-22T12:51:16.000Z"
  },
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "creationAt": "2025-07-22T12:51:19.000Z",
  "updatedAt": "2025-07-22T12:51:19.000Z"
}
```

## Example Usage

### Create a new product

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Product",
    "slug": "new-product",
    "price": 99,
    "description": "Description of the new product",
    "category": {
      "id": 1,
      "name": "Category",
      "slug": "category",
      "image": "https://example.com/image.jpg",
      "creationAt": "2025-07-22T12:51:16.000Z",
      "updatedAt": "2025-07-22T12:51:16.000Z"
    },
    "images": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
    ]
  }'
```