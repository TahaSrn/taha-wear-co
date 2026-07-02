// src/pages/Shop.jsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import ShopSidebar from "../features/shop/ShopSidebar";
import ProductGrid from "../features/products/ProductGrid";

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    categories: [],
    colors: [],
    priceRange: { min: null, max: null },
  });

  // وقتی صفحه لود میشه، فیلتر رو از URL بخون
  useEffect(() => {
    const categoryId = searchParams.get("category");
    if (categoryId) {
      setFilters((prev) => ({
        ...prev,
        categories: [Number(categoryId)],
      }));
    }
  }, [searchParams]);

  // اسکرول به بالای صفحه
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);

    // آپدیت URL
    const params = {};
    if (newFilters.categories.length > 0) {
      params.category = newFilters.categories[0];
    }
    setSearchParams(params, { replace: true }); // ✅ اضافه کردن replace: true
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 bg-caffee-50 pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-sansBold text-stone-800 mb-6">
            همه محصولات
          </h1>

          <div className="flex flex-col md:flex-row gap-6">
            <aside className="w-full md:w-72 lg:w-80 flex-shrink-0">
              <ShopSidebar
                onFilterChange={handleFilterChange}
                initialFilters={filters}
              />
            </aside>

            <div className="flex-1">
              <ProductGrid filters={filters} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Shop;
