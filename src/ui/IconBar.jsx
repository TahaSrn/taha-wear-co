import { HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi";

function IconBar() {
  return (
    <div className="flex gap-5 mr-5 w-full md:w-auto justify-end">
      <div className="hidden md:block bg-blue-500/20 rounded-full p-2 hover:bg-blue-800 hover:text-white text-gray-800/80 transition-all duration-300 cursor-pointer">
        <HiOutlineUser size={30} strokeWidth={1.5} />
      </div>
      <div className="ml-2 md:ml-0 bg-blue-950 rounded-full p-2 px-0 md:px-7 font-sansBold flex items-center justify-center text-white hover:text-blue-800 transition-all duration-300 cursor-pointer w-12 h-12 md:h-auto md:w-auto">
        <HiOutlineShoppingCart size={32} strokeWidth={1.5} />
        <span className="hidden md:block"># هزار تومان</span>
      </div>
    </div>
  );
}

export default IconBar;
