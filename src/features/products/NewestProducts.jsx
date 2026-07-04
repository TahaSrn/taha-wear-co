import { useState, useEffect } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import useGetNewestProducts from "../products/useGetNewestProducts";
import NewestProduct from "./NewestProduct";
import ProductSkeleton from "./ProductSkeleton";

function NewestProducts() {
  const { newestProducts, isLoading } = useGetNewestProducts();
  const [visibleCount, setVisibleCount] = useState(8);
  const [loadMoreCount, setLoadMoreCount] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(6);
        setLoadMoreCount(6);
      } else {
        setVisibleCount(8);
        setLoadMoreCount(8);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto w-full">
        {Array.from({ length: visibleCount }).map((_, i) => (
          <ProductSkeleton
            key={i}
            contentSpaces={2}
            imageHeight={65}
            imageDivPadding={1}
            imageRounded="xl"
          />
        ))}
      </div>
    );
  }

  const visibleProducts = newestProducts.slice(0, visibleCount);
  const hasMore = visibleCount < newestProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + loadMoreCount, newestProducts.length),
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto w-full">
        {visibleProducts.map((pro) => (
          <NewestProduct key={pro.id} product={pro} />
        ))}
      </div>

      {hasMore && (
        <button
          onClick={handleLoadMore}
          className="mt-8 px-8 py-3 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-all duration-300 font-sansMed cursor-pointer text-sm hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          <HiOutlinePlus size={20} />
          بارگیری بیشتر
        </button>
      )}
    </div>
  );
}

export default NewestProducts;
