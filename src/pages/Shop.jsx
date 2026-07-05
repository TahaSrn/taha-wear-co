// src/pages/Shop.jsx
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useLocation } from "react-router";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import ShopSidebar from "../features/shop/ShopSidebar";
import ProductGrid from "../features/products/ProductGrid";
import MobileTabs from "../ui/MobileTabs";

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [filters, setFilters] = useState({
    categories: [],
    colors: [],
    collections: [],
    priceRange: { min: null, max: null },
    search: "",
  });
  const mainRef = useRef(null);

  const categoryId = searchParams.get("category");
  const collectionId = searchParams.get("collection");
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const search = searchParams.get("search");

    setFilters((prev) => ({
      ...prev,
      categories: categoryId ? [Number(categoryId)] : [],
      collections: collectionId ? [Number(collectionId)] : [],
      search: search || "",
    }));
  }, [searchParams]);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "instant", block: "start" });
    }
    window.scrollTo(0, 0);
  }, [location.pathname, searchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);

    const params = {};
    if (newFilters.categories.length > 0) {
      params.category = newFilters.categories[0];
    }
    if (newFilters.collections.length > 0) {
      params.collection = newFilters.collections[0];
    }
    if (newFilters.search) {
      params.search = newFilters.search;
    }
    setSearchParams(params, { replace: true });
  };

  const isOpenFromCategory = !!categoryId;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div ref={mainRef} className="flex-1 bg-caffee-50 pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            <aside className="w-full md:w-72 lg:w-80 flex-shrink-0">
              <ShopSidebar
                onFilterChange={handleFilterChange}
                initialFilters={filters}
                isOpenFromCategory={isOpenFromCategory}
                searchQuery={searchQuery}
              />
            </aside>

            <div className="flex-1">
              <ProductGrid filters={filters} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <MobileTabs />
    </div>
  );
}

export default Shop;
