// src/pages/Shop.jsx
import { useState } from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import ShopSidebar from "../features/shop/ShopSidebar";
import ProductGrid from "../features/products/ProductGrid";

function Shop() {
  const [filters, setFilters] = useState({
    categories: [],
    colors: [],
    priceRange: { min: null, max: null },
  });

  return (
    <div className="flex flex-col min-h-screen bg-caffee-50">
      <Header />

      <div className="flex-1 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-sansBold text-stone-800 mb-6">
            همه محصولات
          </h1>

          <div className="flex flex-col md:flex-row gap-6">
            <aside className="w-full md:w-72 lg:w-80 flex-shrink-0">
              <ShopSidebar onFilterChange={setFilters} />
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
