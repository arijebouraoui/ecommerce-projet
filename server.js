import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();


import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import productRoute from './routes/productRoute.js';
import aiRoute from './routes/aiRoute.js';

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send("<h1>Welcome to my ecommerce app</h1>");
});
//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category',categoryRoute);
app.use('/api/v1/product',productRoute);
app.use('/api/v1/ai', aiRoute); 




//rest api
const PORT = 8080;
app.listen(PORT, () => {
  console.log(` Serveur démarré sur http://localhost:${PORT}`);
});

