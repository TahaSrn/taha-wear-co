// src/ui/CartIcon.jsx
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { formatCurrency } from "../utils/helpers";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { memo, useCallback } from "react";

function CartIcon({ size = "medium" }) {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const navigate = useNavigate();
  const { totalQuantity } = useSelector((state) => state.cart);

  const handleCartClick = useCallback(() => {
    navigate("/cart");
  }, [navigate]);

  const sizes = {
    medium: "w-12 h-12 p-2 px-0 md:px-7",
    small: "p-2",
    xsmall: "p-1",
  };

  return (
    <div
      className={`${size === "medium" ? "ml-2 md:ml-0" : ""} bg-stone-800 relative rounded-full font-sansBold flex items-center justify-center text-white hover:text-stone-500 transition-all duration-300 cursor-pointer md:h-auto md:w-auto z-1 ${sizes[size]}`}
      onClick={handleCartClick}
    >
      <HiOutlineShoppingCart
        size={size === "medium" ? 32 : 20}
        strokeWidth={1.5}
      />
      <span className="hidden md:block">
        {formatCurrency(totalPrice)} هزار تومان
      </span>

      <span
        className={`bg-white ${size === "medium" ? "h-6 w-6" : "h-4 w-4 text-[10px]"} rounded-full absolute right-[-20%]  md:right-[-2%] top-[-5%] text-stone-800 flex items-center justify-center font-sansBold`}
      >
        {totalQuantity}
      </span>
    </div>
  );
}

export default memo(CartIcon);
