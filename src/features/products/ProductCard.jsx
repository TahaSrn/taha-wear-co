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
        price:
          product.discount > 0
            ? product.price * (1 - product.discount / 100)
            : product.price,
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
        price:
          product.discount > 0
            ? product.price * (1 - product.discount / 100)
            : product.price,
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
  const discount = product.discount || 0;
  const hasDiscount = discount > 0;

  const discountedPrice = hasDiscount
    ? product.price * (1 - discount / 100)
    : product.price;

  return (
    <div className="group surface-card surface-card-hover rounded-xl overflow-hidden flex flex-col h-full">
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

        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-sansBold px-2.5 py-1 rounded-full shadow-md">
            {discount}٪
          </div>
        )}

        {productColors.length > 0 && (
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            {productColors.map((color) => (
              <div
                key={color.id}
                title={color.name}
                className={`w-3.5 h-3.5 rounded-full ${
                  colorClassMap[color.name] || "bg-gray-400"
                } shadow-md ring-2 ring-white/80`}
              />
            ))}
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-sansBold text-stone-800 text-sm mb-2 line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <div className="min-h-[48px] flex flex-col justify-center">
          <p className="font-sansBold text-stone-800 text-base">
            {formatCurrency(discountedPrice)} تومان
          </p>

          {hasDiscount ? (
            <p className="font-sansMed text-stone-400 text-sm line-through">
              {formatCurrency(product.price)} تومان
            </p>
          ) : (
            <p className="text-sm opacity-0 select-none">placeholder</p>
          )}
        </div>

        {showColorPicker && productColors.length > 1 && (
          <div className="flex flex-wrap gap-2 justify-center mt-3 p-3 bg-stone-50 rounded-lg border border-stone-200">
            <span className="w-full text-center text-xs font-sansMed text-stone-600">
              لطفاً یک رنگ انتخاب کنید:
            </span>

            {productColors.map((color) => (
              <div
                key={color.id}
                onClick={() => handleColorSelect(color)}
                title={color.name}
                className={`w-8 h-8 rounded-full ${
                  colorClassMap[color.name] || "bg-gray-400"
                } ring-2 ring-offset-2 cursor-pointer transition-all ${
                  selectedColor?.id === color.id
                    ? "ring-stone-800"
                    : "ring-transparent hover:ring-stone-400"
                }`}
              />
            ))}

            <button
              onClick={handleCancel}
              className="w-full mt-2 text-xs text-stone-500 font-sansMed hover:text-stone-800 transition-colors cursor-pointer"
            >
              انصراف
            </button>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className="mt-auto w-full cursor-pointer flex items-center justify-center gap-2 bg-stone-800 text-white py-2 rounded-lg hover:bg-stone-700 transition-all duration-300 text-[10px] md:text-sm font-sansMed hover:shadow-md"
        >
          <HiOutlineShoppingCart size={18} />
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
