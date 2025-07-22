# CRUD Application with Node.js, PostgreSQL, and Vanilla JS

This project demonstrates a full-stack CRUD (Create, Read, Update, Delete) application using:
- Backend: Node.js with Express and PostgreSQL
- Frontend: Vanilla JavaScript with no frameworks

## Project Structure

```
Vanila-JS-components/
├── edi-table/               # Frontend code
│   ├── apiCRUD-local.js     # API client for local server
│   ├── index-local.html     # HTML for local server demo
│   ├── main-local.js        # Main JS for local server demo
│   ├── objectsFromApi-local.js # Data fetching for local server
│   ├── renderTable.js       # Table rendering logic
│   └── styles.css           # CSS styles
└── server/                  # Backend code
    ├── db.js                # Database connection
    ├── init.sql             # SQL initialization script
    ├── package.json         # Node.js dependencies
    ├── server.js            # Express server
    └── setup.js             # Database setup script
```

## Setup Instructions

### Prerequisites

1. Node.js (v14 or higher)
2. PostgreSQL (v12 or higher)

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with your PostgreSQL credentials:
   ```
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=devices_db
   PORT=3000
   ```

4. Run the setup script to create and initialize the database:
   ```
   npm run setup
   ```

5. Start the server:
   ```
   npm start
   ```
   
   For development with auto-restart:
   ```
   npm run dev
   ```

### Frontend Usage

1. Open `edi-table/index-local.html` in your web browser.

2. You can:
   - View all devices in the table
   - Add new devices using the form
   - Edit existing devices by clicking the "Edit" button
   - Delete devices by clicking the "Delete" button
   - Navigate through pages using the pagination controls

## API Endpoints

- `GET /api/devices` - Get all devices
- `GET /api/devices/:id` - Get a specific device
- `POST /api/devices` - Create a new device
- `PUT /api/devices/:id` - Update a device
- `DELETE /api/devices/:id` - Delete a device

## Request Body Format

For POST and PUT requests:

```json
{
  "name": "Device Name",
  "data": {
    "brand": "Brand Name",
    "color": "Color",
    "price": 999
  }
}
```