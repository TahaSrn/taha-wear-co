
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useSearchParams, useLocation } from "react-router";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import ShopSidebar from "../features/shop/ShopSidebar";
import ProductGrid from "../features/products/ProductGrid";
import MobileTabs from "../ui/MobileTabs";


const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);
const MemoizedMobileTabs = memo(MobileTabs);

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [filters, setFilters] = useState({
    categories: [],
    colors: [],
    collections: [],
    priceRange: { min: null, max: null },
    search: "",
    discount: false
  });
  const mainRef = useRef(null);

  useEffect(() => {
    const categoryIds = searchParams.getAll("category");
    const collectionIds = searchParams.getAll("collection");
    const searchQuery = searchParams.get("search") || "";
    const discountParam = searchParams.get("discount") === "true";

    setFilters({
      categories: categoryIds.length > 0 ? categoryIds.map(Number) : [],
      colors: [],
      collections: collectionIds.length > 0 ? collectionIds.map(Number) : [],
      priceRange: { min: null, max: null },
      search: searchQuery,
      discount: discountParam
    });
  }, [searchParams]);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "instant", block: "start" });
    }
    window.scrollTo(0, 0);
  }, [location.pathname, searchParams]);

  const handleFilterChange = useCallback(
    (newFilters) => {
      setFilters(newFilters);

      const params = new URLSearchParams();

      if (newFilters.categories && newFilters.categories.length > 0) {
        newFilters.categories.forEach((catId) => {
          params.append("category", catId);
        });
      }
      if (newFilters.collections && newFilters.collections.length > 0) {
        newFilters.collections.forEach((colId) => {
          params.append("collection", colId);
        });
      }
      if (newFilters.search) {
        params.set("search", newFilters.search);
      }
      if (newFilters.discount) {
        params.set("discount", "true");
      }

      setSearchParams(params, { replace: true });
    },
    [setSearchParams]
  );

  const isOpenFromCategory = !!searchParams.get("category");

  return (
    <div className="flex flex-col min-h-screen">
      <MemoizedHeader />

      <div ref={mainRef} className="flex-1 bg-caffee-50 pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            <aside className="w-full md:w-72 lg:w-80 flex-shrink-0">
              <ShopSidebar
                onFilterChange={handleFilterChange}
                initialFilters={filters}
                isOpenFromCategory={isOpenFromCategory}
                searchQuery={searchParams.get("search") || ""} />
              
            </aside>

            <div className="flex-1">
              <ProductGrid filters={filters} />
            </div>
          </div>
        </div>
      </div>

      <MemoizedFooter />
      <MemoizedMobileTabs />
    </div>);

}

export default memo(Shop);