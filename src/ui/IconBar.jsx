import { HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi";
import { useSelector } from "react-redux";
import { formatCurrency } from "../utils/helpers";
import Shop from "../pages/Shop";
import { useNavigate } from "react-router";

function IconBar() {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const navigate = useNavigate();

  return (
    <div className="flex gap-5 mr-5 w-full md:w-auto justify-end">
      <div className="hidden md:block bg-stone-500/20 rounded-full p-2 hover:bg-stone-800 hover:text-white text-gray-800/80 transition-all duration-300 cursor-pointer">
        <HiOutlineUser size={30} strokeWidth={1.5} />
      </div>
      <div
        className="ml-2 md:ml-0 bg-stone-800 rounded-full p-2 px-0 md:px-7 font-sansBold flex items-center justify-center text-white hover:text-stone-500 transition-all duration-300 cursor-pointer w-12 h-12 md:h-auto md:w-auto z-1"
        onClick={() => navigate("/cart")}
      >
        <HiOutlineShoppingCart size={32} strokeWidth={1.5} />
        <span className="hidden md:block">
          {formatCurrency(totalPrice)} هزار تومان
        </span>
      </div>
    </div>
  );
}

export default IconBar;
