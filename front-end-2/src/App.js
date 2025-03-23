import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/auth/Login";
import FoodList from "./components/food/FoodList";
import FoodForm from "./components/food/FoodForm";
import CategoryForm from "./components/category/CategoryForm";
import HomePage from "./component/home/HomePage";
import FoodEdit from "./components/food/FoodEdit";
import OrderManagement from "./components/order/OrderManagement";
import Home from "./component/home/Home";
import Register from "./component/auth/Register";
import CartPage from "./components/cart/CartPage";
import ChangePassword from "./component/auth/ChangePassword";
import Information from "./component/auth/Information";
import ForgotPassword from "./component/auth/ResetPassword";
import CategoryList from "./components/category/CategoryList";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/homelogin" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/information" element={<Information/>} />
                <Route path="/change_password" element={<ChangePassword />} />
                <Route path="/a" element={<ForgotPassword />} />
                <Route path="/carts" element={<CartPage />} />
                <Route path="/foods" element={<FoodList />} />
                <Route path="/add-food" element={<FoodForm />} />
                <Route path="/edit-food/:id" element={<FoodEdit />} />
                <Route path="/category" element={<CategoryList/>}/>
                <Route path="/add-category" element={<CategoryForm />} />
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/order" element={<OrderManagement />} />
            </Routes>
        </Router>
    );
}

export default App;
