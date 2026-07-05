import { useState } from "react";
import { Link } from "react-router";
import { HiOutlineCube, HiOutlineTag } from "react-icons/hi";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";
import toast from "react-hot-toast";

function NewestProduct({ product }) {
  const dispatch = useDispatch();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  const colors = product.product_colors?.map((pc) => pc.colors) || [];

  const colorClassMap = {
    مشکی: "bg-[#2C2C2C]",
    سفید: "bg-[#F5F5F5] border border-[#E0E0E0]",
    قهوه‌ای: "bg-[#8D6E63]",
    آبی: "bg-[#5C6BC0]",
    قرمز: "bg-[#A0524B]",
    سبز: "bg-[#6B8E6B]",
    زرد: "bg-[#C9A96E]",
    نارنجی: "bg-[#D4896B]",
  };

  const handleAddToCart = () => {
    if (colors.length > 1 && !selectedColor) {
      setShowColorPicker(true);
      return;
    }

    const colorToUse = selectedColor || colors[0];

    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.productImages[0]?.image || "",
        colorId: colorToUse?.id || null,
        colorName: colorToUse?.name || null,
      }),
    );

    toast.success("محصول با موفقیت به سبد خرید اضافه شد");
    setShowColorPicker(false);
    setSelectedColor(null);
  };

  const handleColorSelect = (color) => {
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.productImages[0]?.image || "",
        colorId: color.id,
        colorName: color.name,
      }),
    );

    toast.success("محصول با موفقیت به سبد خرید اضافه شد");
    setShowColorPicker(false);
    setSelectedColor(null);
  };

  const handleCancel = () => {
    setShowColorPicker(false);
    setSelectedColor(null);
  };

  return (
    <div className="rounded-xl bg-white flex flex-col overflow-hidden shadow-md h-full font-sansMed">
      <Link to={`/product/${product.id}`} className="relative block">
        <img
          src={product.productImages[0]?.image}
          alt={product.name}
          className="w-full h-36 md:h-65 object-cover rounded-xl p-1 md:p-1.5 transition-transform duration-300"
        />

        {colors.length > 0 && (
          <div className="absolute top-2 right-2 md:top-3 md:right-3 flex flex-col gap-1">
            {colors.map((color) => (
              <div
                key={color.id}
                title={color.name}
                className={`w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full ${
                  colorClassMap[color.name] || "bg-gray-400"
                } ring-2 ring-white`}
              />
            ))}
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 px-2 md:px-3 pb-2 md:pb-3 pt-2 gap-2 text-stone-800">
        <div className="text-[11px] md:text-base">
          <span className="flex gap-1 items-center">
            <HiOutlineCube className="shrink-0 text-xs md:text-base" />
            <span className="truncate">{product.name}</span>
          </span>
        </div>

        <div className="text-[11px] md:text-base">
          <span className="flex gap-1 items-center">
            <HiOutlineTag className="shrink-0 text-xs md:text-base" />
            {formatCurrency(product.price)} تومان
          </span>
        </div>

        {showColorPicker && colors.length > 1 && (
          <div className="flex flex-wrap gap-2 justify-center mt-2 p-2 bg-stone-50 rounded-lg border">
            <span className="w-full text-center text-[10px] md:text-xs text-stone-600">
              لطفاً یک رنگ انتخاب کنید
            </span>

            {colors.map((color) => (
              <div
                key={color.id}
                onClick={() => handleColorSelect(color)}
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${
                  colorClassMap[color.name] || "bg-gray-400"
                } ring-2 ring-offset-2 cursor-pointer`}
              />
            ))}

            <button
              onClick={handleCancel}
              className="w-full text-[10px] md:text-xs mt-1 text-stone-500 hover:text-stone-800"
            >
              انصراف
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewestProduct;
