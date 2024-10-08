// import express from "express";
// import colors from "colors";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import mongoose from "mongoose";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoute.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import cors from "cors";
// import path from 'path'
// import {fileURLToPath} from 'url'
// // configure dotenv
// dotenv.config();
// // connectDB
// connectDB();


// // esmodule fix
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// // rest object
// const app = express();

// //middleware
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(express.static(path.join(__dirname, '../client/build')))

// // routes
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/category", categoryRoutes);
// app.use("/api/v1/product", productRoutes);



// //rest api
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to Ecommerce app</h1>");
// });

// // rest api
// app.use("*", function(req,res){
//   res.sendFile(path.join(__dirname, './client/build/index.html'))
// })

// // PORT
// const PORT = process.env.PORT || 8080;

// //run listen
// app.listen(PORT, () => {
//   console.log(
//     `Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgYellow
//       .black
//   );
// });



import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

// Configure dotenv
dotenv.config();

// ConnectDB
connectDB();

// esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rest object
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Static files
app.use(express.static(path.join(__dirname, '../client/build')));

// REST API endpoint
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Ecommerce app</h1>");
});

// Serve React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// PORT
const PORT = process.env.PORT || 8080;

// Run listen
app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgYellow.black
  );
});

