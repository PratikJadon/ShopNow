import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/Login/Login";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Products from "./components/ProductDetail/Products";
import Cart from "./components/cart/Cart";
import AdminDashboard from "./components/admin/AdminDashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="products/:searchTerm" element={<Products />} />
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<Cart />} />
      </Route>
      <Route path="/auth" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
