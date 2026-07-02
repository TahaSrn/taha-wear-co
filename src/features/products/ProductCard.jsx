// src/features/shop/ProductCard.jsx
import { Link } from "react-router";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  if (!product) return null;

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.productImages?.[0]?.image || "",
      }),
    );
    toast.success("به سبد خرید اضافه شد");
  };

  const imageUrl = product.productImages?.[0]?.image || "";

  const productColors = product.product_colors?.map((pc) => pc.colors) || [];

  const colorClassMap = {
    مشکی: "bg-[#2C2C2C]",
    سفید: "bg-[#F5F5F5] border border-[#E0E0E0]",
    قهوه‌ای: "bg-[#8D6E63]",
    آبی: "bg-[#5C6BC0]",
    قرمز: "bg-[#A0524B]",
    سبز: "bg-[#6B8E6B]",
    طلایی: "bg-[#C9A96E]",
    نارنجی: "bg-[#D4896B]",
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link
        to={`/product/${product.id}`}
        className="block relative overflow-hidden"
      >
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* رنگ‌ها - بالا سمت راست */}
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

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-sansBold text-stone-800 text-sm mb-1 line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="font-sansBold text-stone-800 text-base">
          {formatCurrency(product.price)} تومان
        </p>

        <button
          onClick={handleAddToCart}
          className="w-full mt-3 cursor-pointer flex items-center justify-center gap-2 bg-stone-800 text-white py-2 rounded-lg hover:bg-stone-700 transition-colors text-sm font-sansMed"
        >
          <HiOutlineShoppingCart size={18} />
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
