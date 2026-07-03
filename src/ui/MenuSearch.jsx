// src/features/menu/MenuSearch.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useSearchProducts } from "../features/products/useSearchProducts";
import { formatCurrency } from "../utils/helpers";

function MenuSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const { products, isLoading } = useSearchProducts(searchTerm);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsOpen(false);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="flex items-center border px-2 gap-2 bg-white border-stone-500/40 h-[46px] rounded-full overflow-hidden w-full font-sansBold"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 30 30"
          fill="#6B7280"
        >
          <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
        </svg>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (e.target.value.trim().length > 0) {
              setIsOpen(true);
            } else {
              setIsOpen(false);
            }
          }}
          onFocus={() => {
            if (searchTerm.trim().length > 0) {
              setIsOpen(true);
            }
          }}
          placeholder="جستجوی محصولات..."
          className="w-full h-full outline-none text-sm text-gray-500"
        />
        <button
          type="submit"
          className="bg-stone-800 w-32 h-9 rounded-full text-sm text-white hover:bg-stone-700 transition-colors cursor-pointer"
        >
          جستجو
        </button>
      </form>

      {/* Dropdown نتایج جستجو */}
      {isOpen && searchTerm.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-100 max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center text-stone-500 font-sansMed">
              در حال جستجو...
            </div>
          ) : products.length === 0 ? (
            <div className="p-4 text-center text-stone-500 font-sansMed">
              محصولی یافت نشد
            </div>
          ) : (
            <div className="py-2">
              {products.slice(0, 6).map((product) => {
                const imageUrl = product.productImages?.[0]?.image || "";
                return (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-stone-50 cursor-pointer transition-colors"
                  >
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-sansMed text-stone-800 text-sm">
                        {product.name}
                      </p>
                      <p className="font-sansMed text-stone-500 text-xs">
                        {formatCurrency(product.price)} تومان
                      </p>
                    </div>
                  </div>
                );
              })}
              {products.length > 6 && (
                <div className="px-4 py-2 text-center text-sm text-stone-400 border-t border-stone-100">
                  {products.length - 6} محصول دیگر ...
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MenuSearch;
