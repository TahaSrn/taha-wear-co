import { useState, useEffect } from "react";
import { Link } from "react-router";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";
import toast from "react-hot-toast";
import { getProductSizes } from "../../services/apiProducts";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [productSizes, setProductSizes] = useState([]);
  const [isLoadingSizes, setIsLoadingSizes] = useState(false);

  if (!product) return null;

  const productColors = product.product_colors?.map((pc) => pc.colors) || [];

  useEffect(() => {
    const fetchSizes = async () => {
      if (product.id) {
        setIsLoadingSizes(true);
        try {
          const sizes = await getProductSizes(product.id);
          setProductSizes(sizes);
          if (sizes.length === 1) {
            setSelectedSize(sizes[0]);
          }
        } catch (error) {
          console.error("Error fetching sizes:", error);
        } finally {
          setIsLoadingSizes(false);
        }
      }
    };
    fetchSizes();
  }, [product.id]);

  const colorClassMap = {
    مشکی: "bg-[#2C2C2C]",
    سفید: "bg-[#F5F5F5] border border-[#E0E0E0]",
    قهوه‌ای: "bg-[#8D6E63]",
    آبی: "bg-[#5C6BC0]",
    قرمز: "bg-[#A0524B]",
    سبز: "bg-[#6B8E6B]",
    زرد: "bg-[#C9A96E]",
    نارنجی: "bg-[#D4896B]"
  };

  const handleAddToCart = () => {
    const hasMultipleColors = productColors.length > 1;
    const hasSizes = productSizes.length > 0;

    if (hasMultipleColors && !selectedColor) {
      setShowColorPicker(true);
      return;
    }

    if (hasSizes && !selectedSize) {
      setShowSizePicker(true);
      return;
    }

    const colorToUse = selectedColor || productColors[0] || null;
    const sizeToUse = selectedSize || null;

    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price:
        product.discount > 0 ?
        product.price * (1 - product.discount / 100) :
        product.price,
        image: product.productImages?.[0]?.image || "",
        colorId: colorToUse?.id || null,
        colorName: colorToUse?.name || null,
        sizeId: sizeToUse?.id || null,
        sizeName: sizeToUse?.name || null
      })
    );

    toast.success("به سبد خرید اضافه شد");
    setShowColorPicker(false);
    setShowSizePicker(false);
    setSelectedColor(null);
    setSelectedSize(null);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setShowColorPicker(false);

    if (productSizes.length > 0 && !selectedSize) {
      setShowSizePicker(true);
      return;
    }

    const sizeToUse = selectedSize || null;
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price:
        product.discount > 0 ?
        product.price * (1 - product.discount / 100) :
        product.price,
        image: product.productImages?.[0]?.image || "",
        colorId: color.id,
        colorName: color.name,
        sizeId: sizeToUse?.id || null,
        sizeName: sizeToUse?.name || null
      })
    );

    toast.success("به سبد خرید اضافه شد");
    setShowColorPicker(false);
    setShowSizePicker(false);
    setSelectedColor(null);
    setSelectedSize(null);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setShowSizePicker(false);

    const colorToUse = selectedColor || productColors[0] || null;

    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price:
        product.discount > 0 ?
        product.price * (1 - product.discount / 100) :
        product.price,
        image: product.productImages?.[0]?.image || "",
        colorId: colorToUse?.id || null,
        colorName: colorToUse?.name || null,
        sizeId: size.id,
        sizeName: size.name
      })
    );

    toast.success("به سبد خرید اضافه شد");
    setShowColorPicker(false);
    setShowSizePicker(false);
    setSelectedColor(null);
    setSelectedSize(null);
  };

  const handleCancel = () => {
    setShowColorPicker(false);
    setShowSizePicker(false);
    setSelectedColor(null);
    setSelectedSize(null);
  };

  const imageUrl = product.productImages?.[0]?.image || "";
  const discount = product.discount || 0;
  const hasDiscount = discount > 0;

  const discountedPrice = hasDiscount ?
  product.price * (1 - discount / 100) :
  product.price;

  const hasMultipleColors = productColors.length > 1;
  const hasSizes = productSizes.length > 0;

  return (
    <div className="group surface-card surface-card-hover rounded-xl overflow-hidden flex flex-col h-full">
      <Link
        to={`/product/${product.id}`}
        className="block relative overflow-hidden shrink-0">
        
        {imageUrl ?
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" /> :


        <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-stone-400 font-sansMed">
            بدون تصویر
          </div>
        }

        {hasDiscount &&
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-sansBold px-2.5 py-1 rounded-full shadow-md">
            {discount}٪
          </div>
        }

        {productColors.length > 0 &&
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            {productColors.map((color) =>
          <div
            key={color.id}
            title={color.name}
            className={`w-3.5 h-3.5 rounded-full ${
            colorClassMap[color.name] || "bg-gray-400"} shadow-md ring-2 ring-white/80`
            } />

          )}
          </div>
        }
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-sansBold text-stone-800 text-sm mb-2 line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <div className="min-h-12 flex flex-col justify-center">
          <p className="font-sansBold text-stone-800 text-base">
            {formatCurrency(discountedPrice)} تومان
          </p>

          {hasDiscount ?
          <p className="font-sansMed text-stone-400 text-sm line-through">
              {formatCurrency(product.price)} تومان
            </p> :

          <p className="text-sm opacity-0 select-none">placeholder</p>
          }
        </div>

        {(showColorPicker || showSizePicker) &&
        <div className="mt-3 p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-3">
            {showColorPicker && hasMultipleColors &&
          <div>
                <span className="block text-center text-xs font-sansMed text-stone-600 mb-2">
                  لطفاً یک رنگ انتخاب کنید:
                </span>
                <div className="flex flex-wrap gap-2 justify-center">
                  {productColors.map((color) =>
              <div
                key={color.id}
                onClick={() => handleColorSelect(color)}
                title={color.name}
                className={`w-8 h-8 rounded-full ${
                colorClassMap[color.name] || "bg-gray-400"} ring-2 ring-offset-2 cursor-pointer transition-all ${

                selectedColor?.id === color.id ?
                "ring-stone-800" :
                "ring-transparent hover:ring-stone-400"}`
                } />

              )}
                </div>
              </div>
          }

            {showSizePicker && hasSizes &&
          <div>
                <span className="block text-center text-xs font-sansMed text-stone-600 mb-2">
                  لطفاً یک سایز انتخاب کنید:
                </span>
                <div className="flex flex-wrap gap-2 justify-center">
                  {productSizes.map((size) =>
              <button
                key={size.id}
                onClick={() => handleSizeSelect(size)}
                className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 font-sansMed text-sm ${
                selectedSize?.id === size.id ?
                "border-stone-800 bg-stone-800 text-white" :
                "border-stone-300 bg-white text-stone-700 hover:border-stone-500"}`
                }>
                
                      {size.name}
                    </button>
              )}
                </div>
              </div>
          }

            <button
            onClick={handleCancel}
            className="w-full mt-1 text-xs text-stone-500 font-sansMed hover:text-stone-800 transition-colors cursor-pointer">
            
              انصراف
            </button>
          </div>
        }

        <button
          onClick={handleAddToCart}
          className="mt-auto w-full cursor-pointer flex items-center justify-center gap-2 bg-stone-800 text-white py-2 rounded-lg hover:bg-stone-700 transition-all duration-300 text-[10px] md:text-sm font-sansMed hover:shadow-md">
          
          <HiOutlineShoppingCart size={18} />
          افزودن به سبد خرید
        </button>
      </div>
    </div>);

}

export default ProductCard;