// src/features/shop/ProductCard.jsx
import { Link } from "react-router";
import { HiOutlineShoppingCart, HiOutlineHeart } from "react-icons/hi";
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
        <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
          <HiOutlineHeart size={18} className="text-stone-600" />
        </button>
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
          className="w-full mt-3 flex items-center justify-center gap-2 bg-stone-800 text-white py-2 rounded-lg hover:bg-stone-700 transition-colors text-sm font-sansMed"
        >
          <HiOutlineShoppingCart size={18} />
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
