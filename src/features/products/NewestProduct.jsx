// src/features/products/NewestProduct.jsx
import { useState } from "react";
import { Link } from "react-router";
import { HiOutlineCube, HiOutlineTag } from "react-icons/hi";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";
import toast from "react-hot-toast";

function NewestProduct({ product }) {
  const dispatch = useDispatch();
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

  const discount = product.discount || 0;
  const hasDiscount = discount > 0;
  const discountedPrice = hasDiscount
    ? product.price * (1 - discount / 100)
    : product.price;

  const handleAddToCart = () => {
    const colorToUse = selectedColor || colors[0];

    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: discountedPrice,
        image: product.productImages[0]?.image || "",
        colorId: colorToUse?.id || null,
        colorName: colorToUse?.name || null,
      }),
    );

    toast.success("محصول با موفقیت به سبد خرید اضافه شد");
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="w-full min-w-0 rounded-xl bg-white flex flex-col overflow-hidden shadow-md h-full font-sansMed">
      <Link to={`/product/${product.id}`} className="relative block w-full">
        <img
          src={product.productImages[0]?.image}
          alt={product.name}
          className="w-full h-44 md:h-72 object-cover rounded-xl p-1 md:p-1.5"
        />

        {hasDiscount && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-red-500 text-white text-[10px] md:text-xs font-sansBold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full shadow-md">
            {discount}٪
          </div>
        )}

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

      <div className="flex flex-col flex-1 px-2 md:px-3 pt-2 pb-2 md:pb-3 gap-2 text-stone-800">
        <div className="flex items-center w-full text-[12px] md:text-base">
          <HiOutlineCube className="shrink-0 text-xs md:text-base ml-1" />
          <span className="min-w-0 overflow-hidden whitespace-nowrap text-ellipsis">
            {product.name}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] md:text-base min-w-0">
          <HiOutlineTag className="shrink-0 text-xs md:text-base" />
          <span className="font-sansBold whitespace-nowrap">
            {formatCurrency(discountedPrice)} تومان
          </span>
          {hasDiscount && (
            <span className="text-stone-400 text-[12px] font-bold md:text-sm line-through mr-1 whitespace-nowrap">
              {formatCurrency(product.price)} تومان
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewestProduct;
