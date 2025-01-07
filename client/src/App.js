
import React from 'react';

import { Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/auth/Register";
import ForgotPasssword from "./pages/auth/ForgotPasssword";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/auth/login";
//import { CartProvider } from "./context/cart";
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
//import Orders from './pages/user/Orders';
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from './pages/Admin/AdminDashboard';
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Products from "./pages/Admin/Products";
import Users from "./pages/Admin/Users";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Orders from './pages/user/Orders';
import Profile from "./pages/user/Profile";
//import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import CategoryProduct from "./pages/CategoryProduct";
import Categories from "./pages/Categories";
import CartPage from './pages/CartPage';
//import CheckoutSuccess from './pages/payment/CheckoutSuccess';
//import CheckoutFail from './pages/payment/CheckoutFail';

function App() {
  return (
    <>
         <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/Cart" element={<CartPage/>}/>
       
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>

    </>
  );
}

export default App; // Exporting the App component as the default export.