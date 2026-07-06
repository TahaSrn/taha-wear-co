
import { useNavigate, useLocation } from "react-router";
import { FaStore } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import CartIcon from "./CartIcon";
import { HiOutlineUser } from "react-icons/hi";
import { Link } from "react-router";
import { useAuth } from "../features/authentication/useAuth";

function MobileTabs() {
  const navigate = useNavigate();
  const location = useLocation();
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

  const isActive = (path) => {
    return location.pathname === path;
  };

  const TabItem = ({ isActive, children }) =>
  <div className="flex flex-col items-center justify-center gap-0.5 relative">
      {children}
      {isActive &&
    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-stone-800 rounded-full" />
    }
    </div>;


  return (
    <div className="block md:hidden bg-white/95 backdrop-blur-md border-t border-caffee-200 w-full fixed bottom-0 flex justify-around items-center pt-2 pb-2 font-sansMed z-50 shadow-[0_-4px_20px_rgba(46,39,36,0.08)]">
      <TabItem isActive={isActive("/")}>
        <button
          onClick={handleHomeClick}
          className={`flex flex-col items-center gap-0.5 transition-colors ${
          isActive("/") ?
          "text-stone-800" :
          "text-stone-600 hover:text-stone-900"}`
          }>
          
          <HiOutlineHome size={24} />
          <span className="text-[10px]">خانه</span>
        </button>
      </TabItem>

      <TabItem isActive={isActive("/shop")}>
        <Link
          to="/shop"
          className={`flex flex-col items-center gap-0.5 transition-colors ${
          isActive("/shop") ?
          "text-stone-800" :
          "text-stone-600 hover:text-stone-900"}`
          }>
          
          <FaStore size={24} />
          <span className="text-[10px]">فروشگاه</span>
        </Link>
      </TabItem>

      <TabItem isActive={isActive("/cart")}>
        <Link
          to="/cart"
          className={`flex flex-col items-center gap-0.5 transition-colors ${
          isActive("/cart") ?
          "text-stone-800" :
          "text-stone-600 hover:text-stone-900"}`
          }>
          
          <CartIcon size="xsmall" />
          <span className="text-[10px]">سبد خرید</span>
        </Link>
      </TabItem>

      <TabItem isActive={isActive("/user") || isActive("/login")}>
        <button
          onClick={handleUserClick}
          className={`flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${
          isActive("/user") || isActive("/login") ?
          "text-stone-800" :
          "text-stone-600 hover:text-stone-900"}`
          }>
          
          <HiOutlineUser size={24} />
          <span className="text-[10px]">حساب کاربری</span>
        </button>
      </TabItem>
    </div>);

}

export default MobileTabs;