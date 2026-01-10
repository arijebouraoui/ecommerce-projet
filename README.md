\# E-Commerce MERN Stack Project



A full-stack e-commerce web application built with MongoDB, Express.js, React.js, and Node.js.



\## 🎯 About



This is a complete e-commerce platform with user authentication, product browsing, shopping cart, and an admin panel for managing products, categories, and orders.



\## ✨ Features



\### User Features

\- User authentication and authorization

\- Browse products by categories

\- Search and filter products

\- Shopping cart functionality

\- Secure checkout process

\- Order history

\- User profile management



\### Admin Features

\- Admin dashboard

\- Product management (CRUD operations)

\- Category management

\- Order management

\- User management



\## 🛠 Technologies Used



\*\*Frontend:\*\* React.js, React Router DOM, Axios, Context API, CSS3



\*\*Backend:\*\* Node.js, Express.js, MongoDB, Mongoose, JWT Authentication, Bcrypt



\## 📁 Project Structure



```

Ecommerce-projet/

│

├── client/              # Frontend React application

├── config/              # Configuration files

├── controllers/         # Route controllers

├── helpers/             # Helper functions

├── middlewares/         # Custom middleware

├── models/              # Mongoose models

├── routes/              # API routes

├── .env                 # Environment variables

├── server.js            # Main server file

└── README.md

```



\## 🚀 Getting Started



\### Prerequisites



\- Node.js (v14.0 or higher)

\- MongoDB

\- npm or yarn



\### Installation



1\. Clone the repository

```bash

git clone https://github.com/arijebouraoui/ecommerce-projet.git

cd Ecommerce-projet

```



2\. Install backend dependencies

```bash

npm install

```



3\. Install frontend dependencies

```bash

cd client

npm install

cd ..

```



4\. Create a `.env` file in the root directory with your configuration



\### Running the Application



1\. Start the backend server:

```bash

npm run server

```



2\. Start the frontend (in a new terminal):

```bash

cd client

npm start

```



The application will be available at:

\- Frontend: `http://localhost:5173`

\- Backend: `http://localhost:8080`



\## 🔌 API Endpoints



\### Authentication

\- `POST /api/v1/auth/register` - Register new user

\- `POST /api/v1/auth/login` - Login user

\- `GET /api/v1/auth/user-auth` - Verify user authentication

\- `GET /api/v1/auth/admin-auth` - Verify admin authentication



\### Products

\- `GET /api/v1/product/products` - Get all products

\- `GET /api/v1/product/product/:slug` - Get single product

\- `POST /api/v1/product/create-product` - Create product (Admin)

\- `PUT /api/v1/product/update-product/:id` - Update product (Admin)

\- `DELETE /api/v1/product/delete-product/:id` - Delete product (Admin)



\### Categories

\- `GET /api/v1/category/categories` - Get all categories

\- `GET /api/v1/category/category/:slug` - Get single category

\- `POST /api/v1/category/create-category` - Create category (Admin)

\- `PUT /api/v1/category/update-category/:id` - Update category (Admin)

\- `DELETE /api/v1/category/delete-category/:id` - Delete category (Admin)



\## 📧 Contact



\*\*Arije Bouraoui\*\*

\- GitHub: \[@arijebouraoui](https://github.com/arijebouraoui)

\- Project Link: \[https://github.com/arijebouraoui/ecommerce-projet](https://github.com/arijebouraoui/ecommerce-projet)



---



Made with ❤️ using MERN Stack

