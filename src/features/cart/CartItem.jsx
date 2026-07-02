// src/features/cart/CartItem.jsx
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { removeItem, increaseQuantity, decreaseQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { HiOutlineTrash, HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <>
      {/* حالت موبایل - کارتی */}
      <div className="md:hidden bg-white rounded-xl p-4 shadow-md border border-stone-100 space-y-3">
        <div className="flex items-start gap-3">
          <Link to={`/product/${item.id}`} className="flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
          <div className="flex-1">
            <Link to={`/product/${item.id}`}>
              <h3 className="font-bold text-stone-800 text-sm hover:text-stone-600 transition-colors">
                {item.name}
              </h3>
            </Link>
            {item.colorName && (
              <p className="text-xs text-stone-500 mt-0.5">
                رنگ: {item.colorName}
              </p>
            )}
            <p className="text-stone-600 text-sm mt-1">
              {formatCurrency(item.price)} تومان
            </p>
          </div>
          <button
            onClick={() =>
              dispatch(removeItem({ id: item.id, colorId: item.colorId }))
            }
            className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
          >
            <HiOutlineTrash size={20} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                dispatch(
                  decreaseQuantity({ id: item.id, colorId: item.colorId }),
                )
              }
              className="p-1 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
            >
              <HiOutlineMinus size={16} />
            </button>
            <span className="font-bold w-6 text-center text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                dispatch(
                  increaseQuantity({ id: item.id, colorId: item.colorId }),
                )
              }
              className="p-1 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
            >
              <HiOutlinePlus size={16} />
            </button>
          </div>
          <div>
            <span className="font-bold text-stone-800 text-sm">
              {formatCurrency(item.totalPrice)} تومان
            </span>
          </div>
        </div>
      </div>

      {/* حالت تبلت و دسکتاپ - جدولی */}
      <div className="hidden md:grid grid-cols-12 gap-2 items-center py-3 lg:py-4 border-b-2 border-stone-200 font-sansBold w-full">
        <button
          onClick={() =>
            dispatch(removeItem({ id: item.id, colorId: item.colorId }))
          }
          className="col-span-1 text-red-400 hover:text-red-600 transition-colors cursor-pointer flex justify-center"
        >
          <HiOutlineTrash size={20} className="lg:size-[22px]" />
        </button>

        <Link to={`/product/${item.id}`} className="col-span-2">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-20 lg:w-20 lg:h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
          />
        </Link>

        <div className="col-span-3">
          <Link to={`/product/${item.id}`}>
            <h3 className="font-bold text-stone-800 text-sm lg:text-base truncate hover:text-stone-600 transition-colors">
              {item.name}
            </h3>
          </Link>
          {item.colorName && (
            <span className="text-xs text-stone-500">
              رنگ: {item.colorName}
            </span>
          )}
        </div>

        <div className="col-span-2 text-stone-600 text-sm lg:text-base text-center">
          {formatCurrency(item.price)} تومان
        </div>

        <div className="col-span-2 flex items-center justify-center gap-1 lg:gap-2">
          <button
            onClick={() =>
              dispatch(decreaseQuantity({ id: item.id, colorId: item.colorId }))
            }
            className="p-1 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
          >
            <HiOutlineMinus size={16} className="lg:size-[18px]" />
          </button>

          <span className="font-bold w-5 lg:w-6 text-center text-sm lg:text-base">
            {item.quantity}
          </span>

          <button
            onClick={() =>
              dispatch(increaseQuantity({ id: item.id, colorId: item.colorId }))
            }
            className="p-1 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
          >
            <HiOutlinePlus size={16} className="lg:size-[18px]" />
          </button>
        </div>

        <div className="col-span-2 text-left">
          <span className="font-bold text-stone-800 text-sm lg:text-base">
            {formatCurrency(item.totalPrice)} تومان
          </span>
        </div>
      </div>
    </>
  );
}

export default CartItem;
