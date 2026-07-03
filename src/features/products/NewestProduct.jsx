// src/features/products/NewestProduct.jsx
import { useState } from "react";
import { Link } from "react-router";
import {
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineTag,
} from "react-icons/hi";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";
import toast from "react-hot-toast";

function NewestProduct({ product }) {
  const dispatch = useDispatch();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  const colors = product.product_colors?.map((pc) => pc.colors) || [];
  const hasSingleColor = colors.length === 1;

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
    setSelectedColor(color);
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
    <div className="rounded-xl bg-white w-full flex flex-col items-center justify-start pt-1 font-sansMed relative overflow-hidden shadow-md h-full">
      <Link
        to={`/product/${product.id}`}
        className="block relative w-full flex-shrink-0"
      >
        <img
          className="w-[98%] h-65 object-cover rounded-xl transition-transform duration-300 cursor-pointer mx-auto"
          src={product.productImages[0]?.image}
          alt={product.productImages[0]?.image}
        />

        {colors.length > 0 && (
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            {colors.map((color) => (
              <div
                key={color.id}
                className={`w-3.5 h-3.5 rounded-full ${colorClassMap[color.name] || "bg-gray-400"} shadow-md ring-2 ring-white/80 font-sansMed`}
                title={color.name}
              />
            ))}
          </div>
        )}
      </Link>

      <div className="text-stone-800 flex flex-col right-3 top-75 text-md md:text-lg text-right gap-2 w-[90%] mt-3 flex-1 pb-3">
        <div className="min-h-[3rem]">
          <span className="flex items-center gap-1">
            <HiOutlineCube className="flex-shrink-0" />
            <span className="line-clamp-2">{product.name}</span>
          </span>
        </div>

        <div className="min-h-[2rem]">
          <span className="flex items-center gap-1">
            <HiOutlineTag className="flex-shrink-0" />
            {formatCurrency(product.price)} تومان
          </span>
        </div>

        {showColorPicker && colors.length > 1 && (
          <div className="flex flex-wrap gap-2 justify-center mt-2 p-3 bg-stone-50 rounded-lg border border-stone-200">
            <span className="text-xs text-stone-600 w-full text-center mb-1">
              لطفاً یک رنگ انتخاب کنید:
            </span>
            {colors.map((color) => (
              <div
                key={color.id}
                onClick={() => handleColorSelect(color)}
                className={`w-8 h-8 rounded-full ${colorClassMap[color.name] || "bg-gray-400"} ring-2 ring-offset-2 ring-transparent hover:ring-stone-800 transition-all cursor-pointer ${
                  selectedColor?.id === color.id ? "ring-stone-800" : ""
                }`}
                title={color.name}
              />
            ))}
            <button
              onClick={handleCancel}
              className="text-xs text-stone-500 hover:text-stone-800 w-full mt-2 transition-colors cursor-pointer"
            >
              انصراف
            </button>
          </div>
        )}

        <div className="flex justify-center pb-1 mt-auto">
          <Button type="primary" size="medium" onClick={handleAddToCart}>
            <span>افزودن به سبد خرید</span>
            <HiOutlineShoppingCart size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewestProduct;
