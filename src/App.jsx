import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage.";
import Shop from "./pages/Shop";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import User from "./pages/User";
import Cart from "./features/cart/Cart";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ArticlePage from "./pages/ArticlePage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          className: "font-sansBold",
          style: {
            background: "#ffffff",
            color: "#2e2724",
            border: "1px solid #e8ddd2",
            boxShadow: "0 4px 16px rgba(46, 39, 36, 0.12)",
          },
          success: {
            iconTheme: {
              primary: "#6b8e6b",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#a0524b",
              secondary: "#ffffff",
            },
          },
        }}
      />
      <BrowserRouter>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            window.location.reload();
          }}
        >
          <Routes>
            <Route path="/" element={<AppLayout />} />
            <Route index element={<Homepage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/user" element={<User />} />
            <Route path="product/:productId" element={<ProductDetails />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/article/:slug" element={<ArticlePage />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
