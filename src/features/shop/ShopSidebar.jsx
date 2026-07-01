// src/features/shop/ShopSidebar.jsx
import { useState, useEffect } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import useGetCategories from "../categories/useGetCategories";
import useGetMaxPrice from "./useGetMaxPrice";

function ShopSidebar({ onFilterChange }) {
  // تشخیص اندازه صفحه
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [openSections, setOpenSections] = useState({
    categories: !isMobile,
    price: !isMobile,
    colors: !isMobile,
  });

  // وقتی isMobile تغییر میکنه، openSections رو آپدیت کن
  useEffect(() => {
    setOpenSections({
      categories: !isMobile,
      price: !isMobile,
      colors: !isMobile,
    });
  }, [isMobile]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });

  const { categories = [], isLoading } = useGetCategories();
  const { maxPrice = 10000000 } = useGetMaxPrice();

  useEffect(() => {
    setPriceRange({ min: 0, max: maxPrice });
  }, [maxPrice]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const colors = [
    { id: 1, name: "مشکی", class: "bg-black" },
    { id: 2, name: "سفید", class: "bg-white border-2 border-gray-300" },
    { id: 3, name: "قهوه‌ای", class: "bg-amber-800" },
    { id: 4, name: "آبی", class: "bg-blue-600" },
    { id: 5, name: "قرمز", class: "bg-red-600" },
    { id: 6, name: "سبز", class: "bg-green-600" },
    { id: 7, name: "طلایی", class: "bg-amber-400" },
    { id: 8, name: "نارنجی", class: "bg-orange-500" },
  ];

  const toggleColor = (colorId) => {
    setSelectedColors((prev) =>
      prev.includes(colorId)
        ? prev.filter((id) => id !== colorId)
        : [...prev, colorId],
    );
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const numValue = Number(value);

    setPriceRange((prev) => {
      if (name === "min" && numValue > prev.max) {
        return { min: prev.max, max: numValue };
      }
      if (name === "max" && numValue < prev.min) {
        return { min: numValue, max: prev.min };
      }
      return { ...prev, [name]: numValue };
    });
  };

  const applyPriceFilter = () => {
    onFilterChange({
      categories: selectedCategories,
      colors: selectedColors,
      priceRange: {
        min: priceRange.min,
        max: priceRange.max,
      },
    });
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setPriceRange({ min: 0, max: maxPrice });
    onFilterChange({
      categories: [],
      colors: [],
      priceRange: { min: null, max: null },
    });
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat("fa-IR").format(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 sticky top-20">
      {/* دسته‌بندی */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          className="flex justify-between items-center w-full font-sansBold text-stone-800 text-base"
          onClick={() => toggleSection("categories")}
        >
          <span className="font-sansBold">دسته‌بندی</span>
          {openSections.categories ? (
            <HiChevronUp size={20} />
          ) : (
            <HiChevronDown size={20} />
          )}
        </button>
        {openSections.categories && (
          <div className="mt-3 space-y-2">
            {isLoading ? (
              <div className="text-sm text-stone-400 font-sansMed">
                در حال بارگذاری...
              </div>
            ) : (
              categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center font-sansMed justify-between cursor-pointer text-sm text-stone-600 hover:text-stone-800"
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => handleCategoryChange(cat.id)}
                      className="rounded border-gray-300 accent-stone-800"
                    />
                    {cat.name}
                  </span>
                  <span className="text-xs text-stone-400">
                    ({cat.productCount || 0})
                  </span>
                </label>
              ))
            )}
          </div>
        )}
      </div>

      {/* محدوده قیمت */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          className="flex justify-between items-center w-full font-sansBold text-stone-800 text-base"
          onClick={() => toggleSection("price")}
        >
          <span>محدوده قیمت</span>
          {openSections.price ? (
            <HiChevronUp size={20} />
          ) : (
            <HiChevronDown size={20} />
          )}
        </button>
        {openSections.price && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="font-sansMed text-stone-600">قیمت:</span>
              <div className="flex items-center gap-2">
                <span className="font-sansBold text-stone-800 bg-stone-100 px-3 py-1 rounded-lg">
                  {formatPrice(priceRange.min)}
                </span>
                <span className="text-stone-300">—</span>
                <span className="font-sansBold text-stone-800 bg-stone-100 px-3 py-1 rounded-lg">
                  {formatPrice(priceRange.max)}
                </span>
              </div>
            </div>

            <div className="relative pt-3 pb-8 px-1">
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div
                  className="absolute h-2 bg-stone-800 rounded-full"
                  style={{
                    right: `${(priceRange.min / maxPrice) * 100}%`,
                    left: `${100 - (priceRange.max / maxPrice) * 100}%`,
                  }}
                />
              </div>

              <input
                type="range"
                name="min"
                min={0}
                max={maxPrice}
                value={priceRange.min}
                onChange={handlePriceChange}
                className="absolute top-3 w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-stone-800 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <input
                type="range"
                name="max"
                min={0}
                max={maxPrice}
                value={priceRange.max}
                onChange={handlePriceChange}
                className="absolute top-3 w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-stone-800 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>

            <button
              onClick={applyPriceFilter}
              className="w-full mt-2 bg-stone-800 cursor-pointer text-white text-sm py-2.5 rounded-xl hover:bg-stone-700 transition-all duration-300 font-sansMed hover:shadow-lg hover:-translate-y-0.5"
            >
              اعمال فیلتر
            </button>
          </div>
        )}
      </div>

      {/* رنگ */}
      <div className="pb-2">
        <button
          className="flex justify-between items-center w-full font-sansBold text-stone-800 text-base"
          onClick={() => toggleSection("colors")}
        >
          <span>رنگ</span>
          {openSections.colors ? (
            <HiChevronUp size={20} />
          ) : (
            <HiChevronDown size={20} />
          )}
        </button>
        {openSections.colors && (
          <div className="mt-4">
            <div className="grid grid-cols-4 gap-3">
              {colors.map((color) => {
                const isSelected = selectedColors.includes(color.id);
                return (
                  <button
                    key={color.id}
                    onClick={() => toggleColor(color.id)}
                    className="group relative cursor-pointer flex flex-col items-center gap-1 transition-all duration-200"
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${color.class} shadow-md transition-all duration-200 ${
                        isSelected
                          ? "ring-2 ring-stone-800 ring-offset-2 scale-110"
                          : "hover:scale-105 hover:shadow-lg"
                      }`}
                      title={color.name}
                    />
                    <span
                      className={`text-[10px] font-sansMed transition-colors ${
                        isSelected ? "text-stone-800" : "text-stone-400"
                      }`}
                    >
                      {color.name}
                    </span>
                  </button>
                );
              })}
            </div>
            {selectedColors.length > 0 && (
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  {selectedColors.length} رنگ انتخاب شده
                </span>
                <button
                  onClick={() => setSelectedColors([])}
                  className="text-xs text-stone-400 hover:text-red-500 transition-colors"
                >
                  حذف همه
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <button
        onClick={resetFilters}
        className="w-full cursor-pointer mt-4 text-stone-500 text-sm hover:text-stone-800 transition-colors font-sansMed border-t border-gray-200 pt-4"
      >
        حذف همه فیلترها
      </button>
    </div>
  );
}

export default ShopSidebar;
