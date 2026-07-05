// src/features/products/NewestProducts.jsx
import { useRef, useState, useEffect } from "react";
import useGetNewestProducts from "../products/useGetNewestProducts";
import NewestProduct from "./NewestProduct";
import ProductSkeleton from "./ProductSkeleton";
import { HiOutlineChevronLeft, HiOutlineSparkles } from "react-icons/hi";
import CategorySubject from "../categories/CategorySubject";

function NewestProducts() {
  const { newestProducts, isLoading } = useGetNewestProducts();

  const scrollContainerRef = useRef(null);

  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
  };

  useEffect(() => {
    if (isLoading) return;

    const container = scrollContainerRef.current;

    if (!container) return;

    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    setTimeout(checkScroll, 100);

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

  return (
    <div className="px-4 max-w-7xl mx-auto">
      <div className="bg-stone-700 rounded-2xl p-3 md:p-8 relative overflow-hidden">
        <CategorySubject
          icon={HiOutlineSparkles}
          title="جدیدترین محصولات"
          textColor="white"
        />

        <div className="relative mt-3 md:mt-5">
          {/* گرادینت سمت چپ */}
          <div className="absolute left-0 top-0 h-full w-12 md:w-16 bg-gradient-to-r from-stone-700 via-stone-700/80 to-transparent pointer-events-none z-[5]" />

          {isLoading ? (
            <div className="flex gap-2 md:gap-5 pb-2 overflow-hidden">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="basis-[31.5%] md:basis-[19%] shrink-0">
                  <ProductSkeleton
                    contentSpaces={3}
                    desktopImageHeight={64}
                    mobileImageHeight={32}
                    imageDivPadding={1}
                    imageRounded="xl"
                    hasButton={false}
                  />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-2 md:gap-5 snap-x snap-mandatory scrollbar-hide pb-2"
                style={{ scrollBehavior: "smooth" }}
              >
                {newestProducts.map((product) => (
                  <div
                    key={product.id}
                    className="basis-[31.5%] md:basis-[19%] shrink-0 snap-start"
                  >
                    <NewestProduct product={product} />
                  </div>
                ))}
              </div>

              {showRightArrow && (
                <button
                  onClick={scrollLeft}
                  className="
                    absolute
                    left-2
                    top-1/2
                    -translate-y-1/2
                    z-[30]

                    flex
                    items-center
                    justify-center

                    w-9
                    h-9
                    md:w-12
                    md:h-12

                    rounded-full

                    bg-black/40
                    hover:bg-black/60

                    backdrop-blur-md

                    border
                    border-white/20

                    shadow-xl

                    transition-all
                    duration-200

                    cursor-pointer
                  "
                >
                  <HiOutlineChevronLeft className="text-white text-xl md:text-2xl" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewestProducts;
