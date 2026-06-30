import { HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi";

function IconBar() {
  return (
    <div className="flex gap-5 mr-5">
      <div className=" bg-blue-500/20 rounded-full p-1.5 hover:bg-blue-800 hover:text-white text-gray-800/80 transition-all duration-300 cursor-pointer">
        <HiOutlineUser size={30} strokeWidth={1.5} />
      </div>
      <div className=" bg-blue-950 rounded-full p-1.5 font-sansBold flex items-center gap-3 px-6 text-white hover:text-blue-800 transition-all duration-300 cursor-pointer">
        <HiOutlineShoppingCart size={30} strokeWidth={1.5} />
        <span># هزار تومان</span>
      </div>
    </div>
  );
}

export default IconBar;
