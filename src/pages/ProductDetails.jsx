// src/pages/ProductDetails.jsx
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import useGetProduct from "../features/products/useGetProduct";
import { formatCurrency } from "../utils/helpers";
import {
  HiOutlineShoppingCart,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlinePlus,
  HiOutlineMinus,
  HiOutlineTrash,
} from "react-icons/hi";
import Spinner from "../ui/Spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/cartSlice";
import toast from "react-hot-toast";

function ProductDetails() {
  const { productId } = useParams();
  const { product, isLoading } = useGetProduct(productId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  // پیدا کردن آیتم با همان productId و colorId
  const cartItem = cartItems.find(
    (item) =>
      item.id === Number(productId) && item.colorId === selectedColor?.id,
  );
  const quantity = cartItem?.quantity || 0;

  const colors = product?.product_colors?.map((pc) => pc.colors) || [];
  const hasSingleColor = colors.length === 1;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (hasSingleColor && colors.length > 0) {
      setSelectedColor(colors[0]);
    }
  }, [hasSingleColor, colors]);

  const handleAddToCart = () => {
    if (!product) return;

    if (!hasSingleColor && !selectedColor) {
      toast.error("لطفاً یک رنگ را انتخاب کنید");
      return;
    }

    const colorId = selectedColor?.id || colors[0]?.id;
    const colorName = selectedColor?.name || colors[0]?.name;

    // چک کردن اینکه آیا این محصول با این رنگ قبلاً در سبد خرید هست
    const existingItem = cartItems.find(
      (item) => item.id === product.id && item.colorId === colorId,
    );

    if (existingItem) {
      // اگر وجود داره، تعداد رو افزایش بده
      dispatch(increaseQuantity({ id: product.id, colorId: colorId }));
      toast.success(`یک عدد دیگر به ${product.name} (${colorName}) اضافه شد`);
    } else {
      // اگر وجود نداره، آیتم جدید اضافه کن
      dispatch(
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.productImages?.[0]?.image || "",
          colorId: colorId,
          colorName: colorName,
        }),
      );
      toast.success(`${product.name} (${colorName}) به سبد خرید اضافه شد`);
    }
  };

  const handleRemoveFromCart = () => {
    if (!product) return;
    const colorId = selectedColor?.id || colors[0]?.id;
    const colorName = selectedColor?.name || colors[0]?.name;

    dispatch(
      removeItem({
        id: product.id,
        colorId: colorId,
      }),
    );
    toast.success(`${product.name} (${colorName}) از سبد خرید حذف شد`);
  };

  const handleIncrease = () => {
    if (!product) return;
    const colorId = selectedColor?.id || colors[0]?.id;
    dispatch(
      increaseQuantity({
        id: product.id,
        colorId: colorId,
      }),
    );
  };

  const handleDecrease = () => {
    if (!product) return;
    const colorId = selectedColor?.id || colors[0]?.id;
    const colorName = selectedColor?.name || colors[0]?.name;

    if (quantity === 1) {
      dispatch(
        removeItem({
          id: product.id,
          colorId: colorId,
        }),
      );
      toast.success(`${product.name} (${colorName}) از سبد خرید حذف شد`);
    } else {
      dispatch(
        decreaseQuantity({
          id: product.id,
          colorId: colorId,
        }),
      );
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex justify-center items-center h-screen">
          <Spinner />
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <p>محصول یافت نشد</p>
        </main>
        <Footer />
      </>
    );
  }

  const images = product.productImages?.map((img) => img.image) || [];

  const sortedImages = [];
  if (images.length > 0) {
    if (images[1]) sortedImages.push(images[1]);
    for (let i = 2; i < images.length; i++) {
      sortedImages.push(images[i]);
    }
    sortedImages.push(images[0]);
  }

  const currentImage = sortedImages[currentImageIndex] || "";

  const handleNext = () => {
    if (isTransitioning || sortedImages.length <= 1) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) =>
      prev === sortedImages.length - 1 ? 0 : prev + 1,
    );
    setTimeout(() => setIsTransitioning(false), 200);
  };

  const handlePrev = () => {
    if (isTransitioning || sortedImages.length <= 1) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) =>
      prev === 0 ? sortedImages.length - 1 : prev - 1,
    );
    setTimeout(() => setIsTransitioning(false), 200);
  };

  const handleDotClick = (index) => {
    if (isTransitioning || index === currentImageIndex) return;
    setIsTransitioning(true);
    setCurrentImageIndex(index);
    setTimeout(() => setIsTransitioning(false), 200);
  };

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

  const isFirstImage = currentImageIndex === 0;
  const isLastImage = currentImageIndex === sortedImages.length - 1;

  const isInCart = cartItems.some(
    (item) =>
      item.id === Number(productId) && item.colorId === selectedColor?.id,
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* سمت راست: اسلایدر عکس */}
          <div className="w-full lg:w-[55%]">
            <div
              className="relative bg-gray-100 rounded-2xl overflow-hidden group"
              style={{ height: "750px" }}
            >
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-200"
                style={{ opacity: isTransitioning ? 0.7 : 1 }}
              />

              {sortedImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110 border border-gray-200 z-10 ${
                      isFirstImage
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    disabled={isFirstImage}
                  >
                    <HiOutlineChevronLeft
                      size={30}
                      className="text-stone-700"
                    />
                  </button>
                  <button
                    onClick={handleNext}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110 border border-gray-200 z-10 ${
                      isLastImage
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    disabled={isLastImage}
                  >
                    <HiOutlineChevronRight
                      size={30}
                      className="text-stone-700"
                    />
                  </button>
                </>
              )}

              {sortedImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-row-reverse gap-2 bg-black/40 px-3 py-2 rounded-full backdrop-blur-sm z-10">
                  {sortedImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`h-2 rounded-full transition-all ${
                        currentImageIndex === index
                          ? "w-6 bg-white cursor-pointer"
                          : "w-2 bg-white/50 hover:bg-white/80 cursor-pointer"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* سمت چپ: اطلاعات محصول */}
          <div className="w-full lg:w-[45%] flex flex-col">
            {product.categories && (
              <div className="mb-4">
                <span className="text-sm font-sansMed text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
                  {product.categories.name}
                </span>
              </div>
            )}
            <h1 className="text-2xl md:text-3xl font-sansBold text-stone-800">
              {product.name}
            </h1>

            {colors.length > 0 && (
              <div className="mt-6">
                <span className="text-sm font-sansMed text-stone-600 block mb-2">
                  رنگ‌های موجود:
                </span>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => {
                    const isSelected = selectedColor?.id === color.id;
                    return (
                      <div
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`w-9 h-9 rounded-full ${colorClassMap[color.name] || "bg-gray-400"} ring-2 ring-offset-2 transition-all cursor-pointer ${
                          isSelected
                            ? "ring-stone-800"
                            : "ring-transparent hover:ring-stone-400"
                        }`}
                        title={color.name}
                      />
                    );
                  })}
                </div>
                {/* نمایش تعداد هر رنگ در سبد خرید */}
                {colors.map((color) => {
                  const item = cartItems.find(
                    (i) => i.id === Number(productId) && i.colorId === color.id,
                  );
                  if (item) {
                    return (
                      <span
                        key={color.id}
                        className="text-xs text-stone-500 mr-2 font-sansMed"
                      >
                        {color.name}: {item.quantity}
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
            )}
            {product.description && (
              <div className="mt-6">
                <span className="text-sm font-sansMed text-stone-600 block mb-2">
                  توضیحات:
                </span>
                <p className="text-sm font-sansMed text-stone-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
            <div className="mt-6">
              <span className="text-sm font-sansMed text-stone-600 block mb-2">
                نحوه شستشو:
              </span>
              <p className="text-sm font-sansMed text-stone-700 bg-stone-50 px-4 py-2 rounded-lg border border-stone-200">
                حتماً خشکشویی شود
              </p>
            </div>
            <div className="mt-4">
              <span className="text-sm font-sansMed text-stone-600 block mb-2">
                زمان ارسال:
              </span>
              <p className="text-sm font-sansMed text-green-600 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                ۵ الی ۱۰ روز کاری
              </p>
            </div>
            <div className="mt-6">
              <span className="text-2xl md:text-3xl font-sansBold text-stone-800">
                {formatCurrency(product.price)} تومان
              </span>
            </div>
            <div className="mt-6">
              {!isInCart ? (
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-stone-800 text-white py-3.5 rounded-xl hover:bg-stone-700 transition-all duration-300 font-sansMed flex items-center justify-center gap-2 text-base cursor-pointer"
                >
                  <HiOutlineShoppingCart size={22} />
                  افزودن به سبد خرید
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-stone-100 rounded-xl p-1.5 ">
                    <button
                      onClick={handleIncrease}
                      className="w-10 h-10 bg-white hover:bg-stone-200 rounded-lg transition-all duration-200 flex items-center justify-center cursor-pointer shadow-sm"
                    >
                      <HiOutlinePlus size={18} className="text-stone-700" />
                    </button>
                    <span className="font-sansBold text-stone-800 min-w-8 text-center text-base">
                      {quantity}
                    </span>
                    <button
                      onClick={handleDecrease}
                      className="w-10 h-10 bg-white hover:bg-stone-200 rounded-lg transition-all duration-200 flex items-center justify-center cursor-pointer shadow-sm"
                    >
                      <HiOutlineMinus size={18} className="text-stone-700" />
                    </button>
                  </div>
                  <button
                    onClick={handleRemoveFromCart}
                    className="bg-[#9a3333] hover:bg-[#751a1a] text-white py-3.5 px-18 md:px-42 rounded-xl transition-all duration-300 font-sansMed flex items-center justify-center gap-2 text-base cursor-pointer"
                  >
                    <HiOutlineTrash size={20} />
                    حذف
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductDetails;
