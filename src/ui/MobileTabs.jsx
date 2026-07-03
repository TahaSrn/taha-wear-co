// src/ui/MobileTabs.jsx
import { useNavigate } from "react-router";
import { FaStore } from "react-icons/fa";
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

  return (
    <div className="block md:hidden bg-stone-50 w-full fixed bottom-0 flex justify-center gap-[10%] pt-2 font-sansMed z-50">
      <div className="flex flex-col items-center justify-center gap-1">
        <Link to="/shop" className="flex flex-col gap-1.5 items-center">
          <FaStore size={25} />
          <span>فروشگاه</span>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <Link to="/cart" className="flex flex-col gap-1 items-center">
          <CartIcon size="small" />
          <span>سبد خرید</span>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <div
          onClick={handleUserClick}
          className="flex flex-col gap-1 items-center cursor-pointer"
        >
          <HiOutlineUser size={25} />
          <span>حساب کاربری</span>
        </div>
      </div>
    </div>
  );
}

export default MobileTabs;
