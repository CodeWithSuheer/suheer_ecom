import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import Navbar from "./components/header/Navbar";
import Home from "./pages/homePage/Home";
import Products from "./pages/allProducts/Products";
import Cart from "./pages/cart/Cart";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import AdminPanel from "./admin/AdminPanel";
import AllProducts from "./admin/AllProducts";
import CreateProduct from "./admin/CreateProduct";
import UpdateProduct from "./admin/UpdateProduct";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import './App.css'
import Footer from "./components/footer/Footer";
import Contact from "./pages/contact/Contact";

function App() {

  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/singleProduct/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />

          {/* AUTH ROUTE */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


          {/* ADMIN ROUTE */}
          <Route path="/admin" element={<AdminPanel />}>
            <Route index element={<AllProducts />} />
            <Route path="create_product" element={<CreateProduct />} />
            <Route path="update_product/:id" element={<UpdateProduct />} />
          </Route>

        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App
