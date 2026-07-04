// src/ui/MobileTabs.jsx
import { useNavigate } from "react-router";
import { FaStore } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import CartIcon from "./CartIcon";
import { HiOutlineUser } from "react-icons/hi";
import { Link } from "react-router";
import { useAuth } from "../features/authentication/useAuth";

function MobileTabs() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleUserClick = () => {
    if (user) {
      navigate("/user");
    } else {
      navigate("/login");
    }
  };

  const handleHomeClick = () => {
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <div className="block md:hidden bg-white/95 backdrop-blur-md border-t border-caffee-200 w-full fixed bottom-0 flex justify-around items-center pt-2 pb-2 font-sansMed z-50 shadow-[0_-4px_20px_rgba(46,39,36,0.08)]">
      <div className="flex flex-col items-center justify-center gap-0.5">
        <button
          onClick={handleHomeClick}
          className="flex flex-col items-center gap-0.5 text-stone-600 hover:text-stone-900 transition-colors"
        >
          <HiOutlineHome size={24} />
          <span className="text-[10px]">خانه</span>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center gap-0.5">
        <Link
          to="/shop"
          className="flex flex-col items-center gap-0.5 text-stone-600 hover:text-stone-900 transition-colors"
        >
          <FaStore size={24} />
          <span className="text-[10px]">فروشگاه</span>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center gap-0.5">
        <Link
          to="/cart"
          className="flex flex-col items-center gap-0.5 text-stone-600 hover:text-stone-900 transition-colors"
        >
          <CartIcon size="small" />
          <span className="text-[10px]">سبد خرید</span>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center gap-0.5">
        <button
          onClick={handleUserClick}
          className="flex flex-col items-center gap-0.5 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <HiOutlineUser size={24} />
          <span className="text-[10px]">حساب کاربری</span>
        </button>
      </div>
    </div>
  );
}

export default MobileTabs;
