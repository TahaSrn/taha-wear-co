import { FaStore } from "react-icons/fa";
import CartIcon from "./CartIcon";
import { HiOutlineUser } from "react-icons/hi";
import { Link } from "react-router";

function MobileTabs() {
  return (
    <div className="block md:hidden bg-stone-50 w-full fixed bottom-0 flex justify-center gap-[10%] pt-2 font-sansMed">
      <div className=" flex flex-col items-center justify-center gap-1">
        <Link to="/shop" className="flex flex-col gap-1.5">
          <span className="h-1/2 flex items-center justify-center">
            <FaStore size={25} />
          </span>
          <span>فروشگاه</span>
        </Link>
      </div>
      <div className=" flex flex-col items-center justify-center gap-1 ">
        <Link to="/cart" className="flex flex-col gap-1">
          <span className="h-1/2 flex items-center justify-center">
            <CartIcon size="small" />
          </span>
          <span>سبد خرید</span>
        </Link>
      </div>
      <div className=" flex flex-col items-center justify-center gap-1">
        <Link to="/user" className="flex flex-col gap-1">
          <span className="h-1/2 flex items-center justify-center">
            <HiOutlineUser size={25} />
          </span>
          <span>حساب کاربری</span>
        </Link>
      </div>
    </div>
  );
}

export default MobileTabs;
