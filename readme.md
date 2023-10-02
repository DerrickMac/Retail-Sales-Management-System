# Retail Sales Management System

This is a retail sales management system built with Node.js and Express. It allows managing customers, menu items, orders, and more for an ice cream shop.

## URL (NEW*): http://ec2-35-84-212-92.us-west-2.compute.amazonaws.com:52990/

## Tech Stack

### Backend
- Node.js
- Express

### Frontend
- EJS for templating
- jQuery for DOM manipulation
- Bootstrap for styling
- CSS custom styles

The backend Express server handles the API routes and database integration.
The frontend uses EJS templates served by the Express server. jQuery scripts add interactivity and manipulate the DOM. Bootstrap provides styling and layout.

## Features

### Customer Management
- **Add, Edit, Delete Customers:** Easily manage customer information, including adding new customers, updating existing customer details, and deleting customers as needed.
- **Track Reward Points:** Maintain a record of customer reward points, enabling a loyalty program that incentivizes repeat business.

### Menu Management
- **Manage Menu Items:** Create, update, and delete menu items, ensuring an up-to-date and appealing selection for customers.
- **Customize Flavors and Containers:** Tailor the flavors and containers available to provide a personalized dining experience.

### Order Handling
- **Add, Edit, Delete Orders and Suborders:** Streamline the ordering process with comprehensive controls over orders and suborders, including modifications and deletions.
- **Intuitive Order Input:** Utilize a user-friendly interface to effortlessly add new orders and suborders, streamlining the process and enhancing efficiency.

### Database Connectivity
- **Connects to a MySQL Database:** Utilize a robust MySQL database to store and retrieve all system data, ensuring reliable and efficient operations.

## Usage

### Install dependencies

npm install

### Configure database
Update the db credentials in `database/db-connector.js`

### Run the app

node app.js

The server will start on port 52990.

## Database Schema
The MySQL database schema contains the following tables:
- Customers
- Menu Items
- Orders
- Suborders
- Flavors
- Containers

## TODO
- Add authentication
- Improve input validation
