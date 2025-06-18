import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./client/productsPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import CheckOutPage from "./client/checkout";

export default function HomePage() {
    return (
        <div className="w-full h-screen">
            <Header/>
            <div className="w-full h-[calc(100vh-70px)] min-h-[calc(100vh-70px)]">
                    <Routes path="/*">
                        <Route path="/" element={<h1>Home Page</h1>}/>
                        <Route path="/products" element={<ProductsPage/>} />
                        <Route path ="/overview/:id" element={<ProductOverview/>} />
                        <Route path="/cart" element={<CartPage/>}/>
                        <Route path="checkout" element={<CheckOutPage/>}/>
                        <Route path="/*" element={<h1>404 not found</h1>}/>
                    </Routes>
            </div>

        </div>
    )
}