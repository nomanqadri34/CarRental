import express from "express";
import colors from   "colors";
import dotenv from "dotenv";
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import paymentsRoutes from "./routes/paymentsRoutes.js"; // Corrected typo
import cors from 'cors'
import session from 'express-session';
import './controllers/passport.js';
import passport from 'passport';

//configure
dotenv.config();
connectDB();
// rest object
const app = express();
//middle wares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);


// Razorpay configuration


app.use("/api/v1/payment", paymentsRoutes); 
// google auth 

app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET || 'your-secret-key', resave: false, saveUninitialized: true }));
app.use(passport.initialize()); // Ensure passport is initialized
app.use(passport.session()); // Ensure passport session is used

// Define Google auth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/');
});

// rest api
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Three60_onwards</h1>");
});

// port
const PORT = process.env.PORT ||8080 ;
// run listen
app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} mode on port  ${PORT}`.bgCyan.white);
});



