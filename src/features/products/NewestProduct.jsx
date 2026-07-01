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

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.productImages[0]?.image,
      }),
    );

    toast.success("محصول با موفقیت به سبد خرید اضافه شد");
  };

  return (
    <div className="rounded-xl bg-white w-full h-110 flex flex-col items-center justify-start pt-1 font-sansMed relative overflow-hidden shadow-md">
      <img
        className="w-[98%] h-[65%] object-cover rounded-xl transition-transform duration-300"
        src={product.productImages[0].image}
        alt={product.productImages[0].image}
      />

      <div className="text-stone-800 absolute flex flex-col justify-center right-3 top-74 text-md md:text-lg text-right gap-3 w-[90%]">
        <span className="flex items-center gap-1">
          <HiOutlineCube />
          {product.name}
        </span>
        <span className="flex items-center gap-1">
          <HiOutlineTag />
          {formatCurrency(product.price)} تومان
        </span>
        <div className="flex justify-center">
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
