import { HiOutlineUser } from "react-icons/hi";
import CartIcon from "./CartIcon";

function IconBar() {
  return (
    <div className="flex gap-5 mr-5 w-full md:w-auto justify-end">
      <div className="hidden md:block bg-stone-500/20 rounded-full p-2 hover:bg-stone-800 hover:text-white text-gray-800/80 transition-all duration-300 cursor-pointer">
        <HiOutlineUser size={30} strokeWidth={1.5} />
      </div>
      <CartIcon size="medium" />
    </div>
  );
}

export default IconBar;
