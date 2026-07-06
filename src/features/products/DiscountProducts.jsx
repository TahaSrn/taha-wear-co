import { useEffect, useRef, useState } from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineFire,
} from "react-icons/hi";
import { Link } from "react-router";

import useGetDiscountedProducts from "../products/useGetDiscountedProducts";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

const octagonClip =
  "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

function DiscountProducts() {
  const { discountedProducts, isLoading } = useGetDiscountedProducts();
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;

    if (maxScroll <= 0) {
      setShowLeftArrow(false);
      setShowRightArrow(false);
      return;
    }

    const currentScroll = Math.abs(container.scrollLeft);
    const distanceFromStart = currentScroll;
    const distanceFromEnd = maxScroll - currentScroll;

    setShowLeftArrow(distanceFromEnd > 5);
    setShowRightArrow(distanceFromStart > 5);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScroll();

    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [discountedProducts, isLoading]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <section className="px-4 max-w-7xl mx-auto">
        <div className="bg-stone-800 rounded-3xl p-4 md:p-8">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-8 h-8 rounded-full bg-red-500/20 animate-pulse" />
            <div className="h-6 w-48 bg-stone-600 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductSkeleton
                key={i}
                contentSpaces={2}
                desktopImageHeight={"200px"}
                mobileImageHeight={28}
                imageDivPadding={1}
                imageRounded="xl"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (discountedProducts.length === 0) {
    return null;
  }

  return (
    <section className="px-4 max-w-7xl mx-auto relative">
      <div className="relative bg-linear-to-br from-stone-800 to-stone-900 rounded-3xl p-4 md:p-8 shadow-xl shadow-stone-900/20 overflow-hidden">
        <svg
          className="absolute -top-4 -left-4 w-40 h-40 text-red-500/10 pointer-events-none z-0"
          viewBox="0 0 40 40"
        >
          <defs>
            <pattern
              id="girih-discount-products"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M20 2 L34 10 L34 30 L20 38 L6 30 L6 10 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
              />
              <path
                d="M20 2 L38 20 L20 38 L2 20 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#girih-discount-products)"
          />
        </svg>

        <svg
          className="absolute inset-0 w-full h-full text-red-500/5 pointer-events-none z-0"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="large-girih-discount"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M50 5 L85 25 L85 75 L50 95 L15 75 L15 25 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
              />

              <path
                d="M50 5 L95 50 L50 95 L5 50 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
              />

              <path
                d="M50 20 L70 33 L70 67 L50 80 L30 67 L30 33 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
              />

              <path
                d="M50 20 L80 50 L50 80 L20 50 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
              />

              <path
                d="M50 10 L55 45 L90 50 L55 55 L50 90 L45 55 L10 50 L45 45 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#large-girih-discount)" />
        </svg>

        <svg
          className="absolute -bottom-10 -right-10 w-64 h-64 text-red-500/6 pointer-events-none z-0"
          viewBox="0 0 40 40"
        >
          <defs>
            <pattern
              id="girih-discount-products-bottom"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M20 2 L34 10 L34 30 L20 38 L6 30 L6 10 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              />
              <path
                d="M20 2 L38 20 L20 38 L2 20 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#girih-discount-products-bottom)"
          />
        </svg>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0">
                <div
                  className="absolute inset-0 bg-red-500/20"
                  style={{ clipPath: octagonClip }}
                />
                <div
                  className="absolute inset-0.75 bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/30"
                  style={{ clipPath: octagonClip }}
                >
                  <HiOutlineFire className="text-white text-base md:text-lg" />
                </div>
              </div>
              <div>
                <h2 className="text-white font-sansBold text-base md:text-2xl">
                  پیشنهادات شگفت‌انگیز
                </h2>
                <p className="text-stone-400 font-sansMed text-[10px] md:text-sm">
                  {discountedProducts.length} محصول با تخفیف ویژه
                </p>
              </div>
            </div>

            <Link
              to="/shop?discount=true"
              className="hidden sm:flex items-center gap-1 text-red-400 hover:text-red-300 font-sansMed text-sm transition-colors"
            >
              مشاهده همه
              <HiOutlineChevronLeft className="text-lg" />
            </Link>
          </div>

          <div className="relative">
            <button
              onClick={scrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-stone-950/50 hover:bg-stone-950/70 backdrop-blur-sm border border-red-400/20 hover:border-red-400/40 text-red-300 transition-all duration-300 hover:scale-105 ${
                showLeftArrow
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <HiOutlineChevronLeft size={18} className="md:text-2xl" />
            </button>

            <button
              onClick={scrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-stone-950/50 hover:bg-stone-950/70 backdrop-blur-sm border border-red-400/20 hover:border-red-400/40 text-red-300 transition-all duration-300 hover:scale-105 ${
                showRightArrow
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <HiOutlineChevronRight size={18} className="md:text-2xl" />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-2 md:gap-5 pb-2"
              style={{ scrollBehavior: "smooth" }}
            >
              {discountedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-none w-[44%] sm:w-[32%] lg:w-[22%] snap-start"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/shop?discount=true"
            className="relative sm:hidden flex items-center justify-center gap-1 mt-4 text-red-400 hover:text-red-300 font-sansMed text-sm transition-colors border-t border-stone-700 pt-3"
          >
            مشاهده همه محصولات تخفیف‌دار
            <HiOutlineChevronLeft className="text-lg" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DiscountProducts;
