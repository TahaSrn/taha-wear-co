// src/features/products/NewestProducts.jsx
import { useRef, useState, useEffect } from "react";
import useGetNewestProducts from "../products/useGetNewestProducts";
import NewestProduct from "./NewestProduct";
import ProductSkeleton from "./ProductSkeleton";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineSparkles,
} from "react-icons/hi";
import CategorySubject from "../categories/CategorySubject";

function NewestProducts() {
  const { newestProducts, isLoading } = useGetNewestProducts();

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

    setShowLeftArrow(distanceFromEnd > 20);
    setShowRightArrow(distanceFromStart > 20);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    container.scrollLeft = 0;
    checkScroll();

    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [newestProducts, isLoading]);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="px-4 max-w-7xl mx-auto">
      <div className="bg-stone-750 rounded-2xl p-3 md:p-8 relative overflow-hidden">
        {/* الگوی شلوغ - بالا چپ */}
        <svg
          className="absolute -top-8 -left-8 w-64 h-64 text-caffee-300/[0.07] pointer-events-none z-0"
          viewBox="0 0 80 80"
        >
          <defs>
            <pattern
              id="complex-pattern-top"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              {/* ستاره ۸ پر بزرگ */}
              <path
                d="M40 5 L44 36 L75 40 L44 44 L40 75 L36 44 L5 40 L36 36 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
              />
              {/* مربع دور ستاره */}
              <path
                d="M15 15 L65 15 L65 65 L15 65 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
              />
              {/* شش‌ضلعی */}
              <path
                d="M40 20 L55 30 L55 50 L40 60 L25 50 L25 30 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
              />
              {/* لوزی وسط */}
              <path
                d="M40 30 L50 40 L40 50 L30 40 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              {/* دایره دور */}
              <circle
                cx="40"
                cy="40"
                r="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
              />
              {/* خطوط مورب */}
              <line
                x1="15"
                y1="15"
                x2="65"
                y2="65"
                stroke="currentColor"
                strokeWidth="0.2"
              />
              <line
                x1="65"
                y1="15"
                x2="15"
                y2="65"
                stroke="currentColor"
                strokeWidth="0.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#complex-pattern-top)" />
        </svg>

        {/* الگوی شلوغ اصلی - کل پس‌زمینه */}
        <svg
          className="absolute inset-0 w-full h-full text-caffee-400/[0.04] pointer-events-none z-0"
          viewBox="0 0 120 120"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="complex-pattern-main"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              {/* گره اسلامی بزرگ */}
              <path
                d="M60 10 L80 30 L110 60 L80 90 L60 110 L40 90 L10 60 L40 30 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              {/* ستاره ۸ پر وسط */}
              <path
                d="M60 25 L63 57 L95 60 L63 63 L60 95 L57 63 L25 60 L57 57 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
              />
              {/* لوزی‌های تو در تو */}
              <path
                d="M60 35 L85 60 L60 85 L35 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
              />
              <path
                d="M60 45 L75 60 L60 75 L45 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
              />
              <path
                d="M60 52 L68 60 L60 68 L52 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              {/* شش‌ضلعی دور */}
              <path
                d="M60 20 L100 40 L100 80 L60 100 L20 80 L20 40 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
              />
              {/* مثلث‌های متصل */}
              <path
                d="M20 40 L60 20 L100 40 L60 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
              />
              <path
                d="M20 80 L60 100 L100 80 L60 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
              />
              {/* خطوط منحنی تزئینی */}
              <path
                d="M10 60 Q35 30 60 60 Q85 90 110 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
              />
              <path
                d="M10 60 Q35 90 60 60 Q85 30 110 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
              />
              {/* نقطه‌های تزئینی */}
              <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.5" />
              <circle cx="90" cy="30" r="2" fill="currentColor" opacity="0.5" />
              <circle cx="30" cy="90" r="2" fill="currentColor" opacity="0.5" />
              <circle cx="90" cy="90" r="2" fill="currentColor" opacity="0.5" />
              <circle cx="60" cy="15" r="2" fill="currentColor" opacity="0.5" />
              <circle
                cx="60"
                cy="105"
                r="2"
                fill="currentColor"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#complex-pattern-main)" />
        </svg>

        {/* الگوی شلوغ - پایین راست */}
        <svg
          className="absolute -bottom-10 -right-10 w-72 h-72 text-caffee-300/[0.06] pointer-events-none z-0"
          viewBox="0 0 90 90"
        >
          <defs>
            <pattern
              id="complex-pattern-bottom"
              width="90"
              height="90"
              patternUnits="userSpaceOnUse"
            >
              {/* گل ۸ پر */}
              <path
                d="M45 10 L48 42 L80 45 L48 48 L45 80 L42 48 L10 45 L42 42 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              {/* لوزی‌های متصل */}
              <path
                d="M45 25 L65 45 L45 65 L25 45 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
              />
              <path
                d="M45 35 L55 45 L45 55 L35 45 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
              />
              {/* شش‌ضلعی کوچک */}
              <path
                d="M45 30 L58 38 L58 52 L45 60 L32 52 L32 38 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
              />
              {/* چهارگوش‌های تزئینی */}
              <rect
                x="20"
                y="20"
                width="10"
                height="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
              />
              <rect
                x="60"
                y="20"
                width="10"
                height="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
              />
              <rect
                x="20"
                y="60"
                width="10"
                height="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
              />
              <rect
                x="60"
                y="60"
                width="10"
                height="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
              />
              {/* خطوط منحنی */}
              <path
                d="M15 45 Q30 30 45 45 Q60 60 75 45"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#complex-pattern-bottom)"
          />
        </svg>

        {/* محتوای اصلی با z-index بالاتر */}
        <div className="relative z-10">
          <CategorySubject
            icon={HiOutlineSparkles}
            title="جدیدترین محصولات"
            textColor="white"
          />

          <div className="relative mt-3 md:mt-5">
            <button
              onClick={scrollLeft}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 shadow-xl transition-all duration-200 cursor-pointer ${
                showLeftArrow ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <HiOutlineChevronLeft className="text-white text-xl md:text-2xl" />
            </button>

            <button
              onClick={scrollRight}
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 shadow-xl transition-all duration-200 cursor-pointer ${
                showRightArrow ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <HiOutlineChevronRight className="text-white text-xl md:text-2xl" />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-1 md:gap-4 scrollbar-hide snap-x snap-mandatory pb-2"
              style={{ scrollBehavior: "smooth" }}
            >
              {(isLoading ? Array.from({ length: 8 }) : newestProducts).map(
                (item, index) => (
                  <div
                    key={isLoading ? index : item.id}
                    className="flex-none w-[36%] md:w-[22%] snap-start"
                  >
                    {isLoading ? (
                      <ProductSkeleton
                        contentSpaces={4}
                        desktopImageHeight={264}
                        mobileImageHeight={130}
                        imageDivPadding={4}
                        imageRounded="12px"
                        hasButton={false}
                      />
                    ) : (
                      <NewestProduct product={item} />
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewestProducts;
