// src/features/shop/ProductGrid.jsx
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Pagination from "../../ui/Pagination";
import useGetProducts from "../products/useGetProducts";

function ProductGrid({ filters }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const { products = [], isLoading } = useGetProducts({
    categoryIds: filters?.categories || [],
    colors: filters?.colors || [],
    minPrice: filters?.priceRange?.min || null,
    maxPrice: filters?.priceRange?.max || null,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse" />
        ))}
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
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-stone-500 font-sansMed">
          {products.length} محصول
        </span>
        <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-sansMed bg-white focus:ring-2 focus:ring-stone-400 focus:outline-none">
          <option value="newest">جدیدترین</option>
          <option value="price-asc">ارزان‌ترین</option>
          <option value="price-desc">گران‌ترین</option>
        </select>
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
