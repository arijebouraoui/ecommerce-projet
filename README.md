# 🛒 E-Commerce MERN Stack Project

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Power BI](https://img.shields.io/badge/Power_BI-F2C811?style=for-the-badge&logo=powerbi&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

A full-stack e-commerce application built with MERN stack, featuring user authentication, product management, shopping cart, Braintree payment integration, AI-powered chatbot, and Power BI business intelligence dashboard.

## ✨ Features

### 👥 User Features
- 🔐 User authentication & authorization (JWT)
- 🛍️ Browse products by categories
- 🔍 Advanced search & filter functionality
- 🛒 Shopping cart with persistent storage
- 💳 Secure payment processing with Braintree
- 📦 Order tracking & history
- 👤 User profile management
- 💬 AI-powered chatbot for customer support

### 🔧 Admin Features
- 📊 Comprehensive admin dashboard
- ➕ Product management (Create, Read, Update, Delete)
- 📂 Category management
- 📋 Order management & status updates
- 👥 User management
- 📈 Business Intelligence dashboard with Power BI integration
- 💰 Sales analytics & revenue tracking

### 🤖 AI & Analytics
- **AI Chatbot** for instant customer support
- **Google Gemini API** for intelligent recommendations
- **Power BI Dashboard** with MongoDB data warehouse
- Automated business insights & predictions
- Real-time analytics and reporting

## 🛠 Tech Stack

### Frontend
- **React.js** (with Vite)
- **React Router DOM** - Client-side routing
- **Axios** - HTTP requests
- **Context API** - State management (Auth, Cart, Search)
- **React Toastify** - Notifications
- **CSS3** - Custom styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Formidable** - File uploads

### Payment & AI
- **Braintree** - Payment gateway
- **Google Gemini API** - AI chatbot & recommendations

### Analytics
- **Power BI** - Business intelligence
- **MongoDB Data Warehouse** - Analytics storage

## 📁 Project Structure

```
Ecommerce-projet/
│
├── client/                          # Frontend React application
│   ├── public/                      # Static files
│   ├── src/
│   │   ├── assets/                  # Images, fonts, etc.
│   │   ├── components/
│   │   │   ├── Form/                # Reusable form components
│   │   │   ├── Layout/              # Layout components
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Layout.jsx
│   │   │   ├── Routes/              # Protected routes
│   │   │   ├── BiDashboard.jsx      # Business Intelligence Dashboard
│   │   │   ├── Chatbot.jsx          # AI Chatbot component
│   │   │   ├── Prices.jsx           # Price filters
│   │   │   └── Spinner.jsx          # Loading component
│   │   ├── context/
│   │   │   ├── auth.js              # Authentication context
│   │   │   ├── cart.js              # Shopping cart context
│   │   │   └── search.js            # Search context
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── pages/
│   │   │   ├── Admin/               # Admin pages
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── CreateCategory.jsx
│   │   │   │   ├── CreateProduct.jsx
│   │   │   │   ├── Products.jsx
│   │   │   │   ├── UpdateProduct.jsx
│   │   │   │   └── Users.jsx
│   │   │   ├── Auth/                # Authentication pages
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── ForgotPassword.jsx
│   │   │   ├── user/                # User pages
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Orders.jsx
│   │   │   │   └── Profile.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── Categories.jsx
│   │   │   ├── CategoryProduct.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   └── Search.jsx
│   │   ├── services/                # API services
│   │   ├── styles/                  # CSS files
│   │   ├── App.jsx                  # Main app component
│   │   ├── App.css                  # Global styles
│   │   ├── index.css                # Base styles
│   │   └── main.jsx                 # Entry point
│   ├── .env                         # Frontend environment variables
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js               # Vite configuration
│   └── eslint.config.js             # ESLint configuration
│
├── config/
│   └── db.js                        # MongoDB connection
│
├── controllers/
│   ├── authController.js            # Authentication logic
│   ├── categoryController.js        # Category CRUD
│   └── productController.js         # Product CRUD & payment
│
├── helpers/
│   └── authHelper.js                # Password hashing utilities
│
├── middlewares/
│   └── authMiddleware.js            # JWT verification & role check
│
├── models/
│   ├── categoryModel.js             # Category schema
│   ├── orderModel.js                # Order schema
│   ├── productModel.js              # Product schema
│   └── userModel.js                 # User schema
│
├── routes/
│   ├── authRoute.js                 # Auth endpoints
│   ├── categoryRoute.js             # Category endpoints
│   └── productRoute.js              # Product & payment endpoints
│
├── .env                             # Backend environment variables
├── .gitignore
├── package.json
├── package-lock.json
├── server.js                        # Server entry point
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Braintree account
- Google Gemini API key

### Installation

```bash
# Clone repository
git clone https://github.com/arijebouraoui/ecommerce-projet.git
cd ecommerce-projet

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Environment Setup

Create `.env` in **root directory**:

```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
MONGO_URI=mongodb://localhost:27017/ecommerce
PORT=8080
JWT_SECRET=your_jwt_secret_key
BRAINTREE_MERCHANT_ID=your_merchant_id
BRAINTREE_PUBLIC_KEY=your_public_key
BRAINTREE_PRIVATE_KEY=your_private_key
GEMINI_API_KEY=your_gemini_api_key
```

Create `.env` in **client directory** (if needed):

```env
VITE_API_URL=http://localhost:8080
```

### Run the Application

```bash
# Run both frontend and backend concurrently
npm run dev

# Or run separately:

# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

**Access:**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`

## 🔌 API Endpoints

### Authentication (`/api/v1/auth`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | Login user | Public |
| POST | `/forgot-password` | Reset password | Public |
| GET | `/user-auth` | Verify user token | Protected |
| GET | `/admin-auth` | Verify admin token | Admin |
| PUT | `/profile` | Update user profile | Protected |
| GET | `/orders` | Get user orders | Protected |
| GET | `/all-orders` | Get all orders | Admin |
| PUT | `/order-status/:orderId` | Update order status | Admin |

### Products (`/api/v1/product`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/products` | Get all products | Public |
| GET | `/product/:slug` | Get single product | Public |
| POST | `/create-product` | Create product | Admin |
| PUT | `/update-product/:pid` | Update product | Admin |
| DELETE | `/delete-product/:pid` | Delete product | Admin |
| GET | `/product-photo/:pid` | Get product photo | Public |
| POST | `/product-filters` | Filter products | Public |
| GET | `/product-count` | Get product count | Public |
| GET | `/product-list/:page` | Get paginated products | Public |
| GET | `/search/:keyword` | Search products | Public |
| GET | `/related-product/:pid/:cid` | Get related products | Public |
| GET | `/product-category/:slug` | Products by category | Public |
| GET | `/braintree/token` | Get payment token | Protected |
| POST | `/braintree/payment` | Process payment | Protected |

### Categories (`/api/v1/category`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/create-category` | Create category | Admin |
| PUT | `/update-category/:id` | Update category | Admin |
| GET | `/categories` | Get all categories | Public |
| GET | `/single-category/:slug` | Get single category | Public |
| DELETE | `/delete-category/:id` | Delete category | Admin |

## 📊 Power BI Dashboard

### Features
- **Sales Analytics:** Revenue trends, daily/monthly/yearly sales
- **Product Performance:** Best sellers, inventory levels
- **Customer Insights:** User demographics, purchase patterns
- **Order Analytics:** Status distribution, delivery performance
- **Financial Metrics:** Profit margins, ROI analysis

### Setup
1. Connect Power BI to MongoDB
2. Import collections: products, orders, users, categories
3. Create relationships between collections
4. Build visualizations and reports

## 💬 AI Chatbot

The integrated chatbot uses Google Gemini API to provide:
- Instant customer support
- Product recommendations
- Order status inquiries
- FAQ assistance
- Natural language interactions

## 💳 Payment Integration

Braintree payment gateway integration provides:
- Secure credit/debit card processing
- PayPal integration
- Drop-in UI for easy checkout
- Transaction management

### Setup Braintree
1. Sign up at [Braintree](https://www.braintreepayments.com/)
2. Get sandbox credentials from dashboard
3. Add credentials to `.env` file
4. Test with sandbox credit cards

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes with middleware
- Role-based access control (User/Admin)
- CORS configuration
- Input validation and sanitization
- Secure environment variable management

## 📱 Pages & Routes

### Public Routes
- `/` - Homepage
- `/product/:slug` - Product details
- `/categories` - All categories
- `/category/:slug` - Category products
- `/cart` - Shopping cart
- `/search` - Search results
- `/login` - User login
- `/register` - User registration

### Protected Routes (User)
- `/dashboard/user` - User dashboard
- `/dashboard/user/profile` - User profile
- `/dashboard/user/orders` - Order history

### Protected Routes (Admin)
- `/dashboard/admin` - Admin dashboard
- `/dashboard/admin/create-category` - Create category
- `/dashboard/admin/create-product` - Create product
- `/dashboard/admin/products` - Manage products
- `/dashboard/admin/product/:slug` - Update product
- `/dashboard/admin/users` - Manage users

## 🚀 Deployment

### Backend (Railway/Render/Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the dist folder
```

### MongoDB
- Use MongoDB Atlas for production
- Update `MONGO_URI` with Atlas connection string

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📧 Contact

**Arije Bouraoui**
- Email: arije.bouraoui@polytechnicien.tn
- GitHub: [@arijebouraoui](https://github.com/arijebouraoui)

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- MongoDB for database
- React & Vite for frontend
- Express.js for backend
- Braintree for payment processing
- Google Gemini for AI capabilities
- Power BI for analytics

---

<div align="center">

**Made with ❤️ using MERN Stack + AI + Power BI**

⭐ Star this repo if you find it useful!

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=arijebouraoui.ecommerce-projet)

</div>
