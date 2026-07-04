// src/features/shop/ProductGrid.jsx
import { useState, useEffect, useRef } from "react";
import { HiChevronDown, HiOutlineSortAscending } from "react-icons/hi";
import ProductCard from "./ProductCard";
import Pagination from "../../ui/Pagination";
import useGetProducts from "../products/useGetProducts";
import ProductSkeleton from "./ProductSkeleton";

function ProductGrid({ filters }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const productsPerPage = 12;

  const isFirstRender = useRef(true);

  const { products = [], isLoading } = useGetProducts({
    categoryIds: filters?.categories || [],
    colors: filters?.colors || [],
    minPrice: filters?.priceRange?.min || null,
    maxPrice: filters?.priceRange?.max || null,
    sortBy: sortBy,
    search: filters?.search || "",
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <span className="text-sm text-stone-500 font-sansMed bg-stone-100 px-4 py-1.5 rounded-full animate-pulse w-24 h-6"></span>
          <div className="relative w-full sm:w-56">
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none">
              <HiOutlineSortAscending size={18} />
            </div>
            <div className="w-full h-10 bg-gray-200 rounded-xl animate-pulse"></div>
            <HiChevronDown
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
              size={18}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <ProductSkeleton key={i} contentSpaces={1.5} imageHeight={50} />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-stone-500 font-sansMed">محصولی یافت نشد</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <span className="text-sm text-stone-500 font-sansMed bg-stone-100 px-4 py-1.5 rounded-full">
          {products.length} محصول
        </span>

        <div className="relative w-full sm:w-56">
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none">
            <HiOutlineSortAscending size={18} />
          </div>

          <select
            value={sortBy}
            onChange={handleSortChange}
            className="w-full appearance-none bg-transparent border-2 border-stone-300 hover:border-stone-400 rounded-xl px-10 py-2.5 text-sm font-sansMed text-stone-700 text-center focus:ring-2 focus:ring-stone-400 focus:border-stone-400 focus:outline-none transition-all duration-200 cursor-pointer"
          >
            <option value="newest">جدیدترین</option>
            <option value="price-asc">ارزان‌ترین</option>
            <option value="price-desc">گران‌ترین</option>
          </select>

          <HiChevronDown
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
            size={18}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-8">
        <Pagination
          totalProducts={products.length}
          productsPerPage={productsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default ProductGrid;
