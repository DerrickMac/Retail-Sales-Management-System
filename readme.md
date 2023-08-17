# Retail Sales Management System

This is a retail sales management system built with Node.js and Express. It allows managing customers, menu items, orders, and more for a retail business.

## Features
- **Manage customers:** add, edit, delete customers
- **CRUD menu items, flavors, containers**
- **Add, edit, delete orders and suborders**
- **Connects to a MySQL database**

## Usage

### Install dependencies
\`\`\`
npm install
\`\`\`

### Configure database
Update the db credentials in `database/db-connector.js`

### Run the app
\`\`\`
node app.js
\`\`\`
The server will start on port 52990.

## API Reference

### Customers
- GET `/customers` - Get all customers
- POST `/customers` - Add a new customer
- PATCH `/customers/:id` - Update a customer
- DELETE `/customers/:id` - Delete a customer

### Menu Items
- GET `/menu-items` - Get all menu items
- POST `/menu-items` - Create a new menu item
- PATCH `/menu-items/:id` - Update a menu item
- DELETE `/menu-items/:id` - Delete a menu item

## Database Schema
The MySQL database schema contains the following tables:
- Customers
- Menu Items
- Orders
- Suborders
- Flavors
- Containers

## Tech Stack
- Node.js
- Express
- MySQL

## TODO
- Add authentication
- Improve input validation
