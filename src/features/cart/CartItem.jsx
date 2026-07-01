import { useDispatch } from "react-redux";
import { removeItem, increaseQuantity, decreaseQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { HiOutlineTrash, HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center py-2 border-t border-b border-stone-200 font-sansBold pr-[4%] gap-3 w-[64%] mr-[5%]">
      <button
        onClick={() => dispatch(removeItem(item.id))}
        className=" text-red-400 hover:text-red-600 transition-colors cursor-pointer"
      >
        <HiOutlineTrash size={22} />
      </button>

      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-24 object-cover rounded-lg"
      />

      <div className="w-[17%]">
        <h3 className="font-bold text-stone-800 text-sm md:text-base">
          {item.name}
        </h3>
      </div>

      <div className="text-stone-600 text-sm md:text-base w-[19%]">
        {formatCurrency(item.price)} تومان
      </div>

      <div className="flex items-center gap-2 w-[22%]">
        <button
          onClick={() => dispatch(decreaseQuantity(item.id))}
          className="p-1 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
        >
          <HiOutlineMinus size={18} />
        </button>

        <span className="font-bold w-6 text-center text-sm md:text-base">
          {item.quantity}
        </span>

        <button
          onClick={() => dispatch(increaseQuantity(item.id))}
          className="p-1 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
        >
          <HiOutlinePlus size={18} />
        </button>
      </div>

      <div className="w-[20%]">
        <span className="font-bold text-stone-800 text-sm md:text-base">
          {formatCurrency(item.totalPrice)} تومان
        </span>
      </div>
    </div>
  );
}

export default CartItem;
