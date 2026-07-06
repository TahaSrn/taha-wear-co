// src/ui/Search.jsx
import { useState, useEffect, useRef, memo, useCallback } from "react";
import { useNavigate } from "react-router";
import { useSearchProducts } from "../features/products/useSearchProducts";
import { formatCurrency } from "../utils/helpers";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

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

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
        setIsOpen(false);
      }
    },
    [searchTerm, navigate],
  );

  const handleProductClick = useCallback(
    (productId) => {
      navigate(`/product/${productId}`);
      setIsOpen(false);
      setSearchTerm("");
    },
    [navigate],
  );

  const handleFocus = useCallback(() => {
    if (searchTerm.trim().length > 0) {
      setIsOpen(true);
    }
  }, [searchTerm]);

  const handleViewAllResults = useCallback(() => {
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsOpen(false);
    }
  }, [searchTerm, navigate]);

  const handleChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim().length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, []);

  const getDiscountedPrice = useCallback((price, discount) => {
    if (discount > 0) {
      return price * (1 - discount / 100);
    }
    return price;
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 w-full h-12 rounded-full border border-stone-400/40 bg-white px-4 transition-colors focus-within:border-stone-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 30 30"
          fill="#6B7280"
        >
          <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="جستجوی محصولات"
          className="flex-1 pr-3 outline-none bg-transparent text-sm font-sansMed placeholder-gray-500"
        />
      </form>

      {isOpen && searchTerm.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden max-h-96 overflow-y-auto z-50">
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
                const discount = product.discount || 0;
                const hasDiscount = discount > 0;
                const finalPrice = getDiscountedPrice(product.price, discount);

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
                      <div className="flex items-center gap-2">
                        <p className="font-sansMed text-stone-500 text-xs">
                          {formatCurrency(finalPrice)} تومان
                        </p>
                        {hasDiscount && (
                          <p className="font-sansMed text-stone-400 text-[10px] line-through">
                            {formatCurrency(product.price)}
                          </p>
                        )}
                      </div>
                      {hasDiscount && (
                        <span className="text-[10px] font-sansBold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full">
                          {discount}٪
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
              {products.length > 6 && (
                <div
                  onClick={handleViewAllResults}
                  className="px-4 py-2 text-center text-sm text-stone-400 border-t border-stone-100 font-sansMed hover:bg-stone-50 cursor-pointer transition-colors"
                >
                  مشاهده همه {products.length} نتیجه ...
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(Search);
