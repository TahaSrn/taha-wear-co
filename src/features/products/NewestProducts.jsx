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
      <div className="bg-stone-700 rounded-2xl p-3 md:p-8 relative overflow-hidden">
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
                      contentSpaces={3}
                      desktopImageHeight={260}
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
  );
}

export default NewestProducts;
