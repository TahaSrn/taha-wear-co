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
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />} />
          <Route index element={<Homepage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
