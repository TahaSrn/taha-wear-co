// src/features/shop/ProductCard.jsx
import { useState } from "react";
import { Link } from "react-router";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  if (!product) return null;

  const productColors = product.product_colors?.map((pc) => pc.colors) || [];
  const hasSingleColor = productColors.length === 1;

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
    if (productColors.length > 1 && !selectedColor) {
      setShowColorPicker(true);
      return;
    }

    const colorToUse = selectedColor || productColors[0];

    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.productImages?.[0]?.image || "",
        colorId: colorToUse?.id || null,
        colorName: colorToUse?.name || null,
      }),
    );

    toast.success("به سبد خرید اضافه شد");
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
        image: product.productImages?.[0]?.image || "",
        colorId: color.id,
        colorName: color.name,
      }),
    );
    toast.success("به سبد خرید اضافه شد");
    setShowColorPicker(false);
    setSelectedColor(null);
  };

  const handleCancel = () => {
    setShowColorPicker(false);
    setSelectedColor(null);
  };

  const imageUrl = product.productImages?.[0]?.image || "";

  return (
    <div className="group surface-card surface-card-hover rounded-xl overflow-hidden hover:-translate-y-1 flex flex-col h-full">
      <Link
        to={`/product/${product.id}`}
        className="block relative overflow-hidden flex-shrink-0"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-stone-400 font-sansMed">
            بدون تصویر
          </div>
        )}

        {productColors.length > 0 && (
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            {productColors.map((color) => (
              <div
                key={color.id}
                className={`w-3.5 h-3.5 rounded-full ${colorClassMap[color.name] || "bg-gray-400"} shadow-md ring-2 ring-white/80`}
                title={color.name}
              />
            ))}
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-sansBold text-stone-800 text-sm mb-1 line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="font-sansBold text-stone-800 text-base">
          {formatCurrency(product.price)} تومان
        </p>

        {showColorPicker && productColors.length > 1 && (
          <div className="flex flex-wrap gap-2 justify-center mt-2 p-3 bg-stone-50 rounded-lg border border-stone-200">
            <span className="text-xs text-stone-600 w-full font-sansMed text-center mb-1">
              لطفاً یک رنگ انتخاب کنید:
            </span>
            {productColors.map((color) => (
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
              className="text-xs text-stone-500 font-sansMed hover:text-stone-800 w-full mt-2 transition-colors cursor-pointer"
            >
              انصراف
            </button>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className="w-full mt-3 cursor-pointer flex items-center justify-center gap-2 bg-stone-800 text-white py-2 rounded-lg hover:bg-stone-700 transition-all duration-300 text-[12px] md:text-sm font-sansMed hover:shadow-md"
        >
          <HiOutlineShoppingCart size={18} />
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
