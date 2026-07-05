// src/features/shop/ShopSidebar.jsx
import { useState, useEffect } from "react";
import {
  HiChevronDown,
  HiChevronUp,
  HiOutlineSearch,
  HiOutlineFire,
} from "react-icons/hi";
import { useLocation, useNavigate } from "react-router";
import useGetCategories from "../categories/useGetCategories";
import useGetMaxPrice from "./useGetMaxPrice";
import useGetCollections from "../collections/useGetCollections";

function ShopSidebar({
  onFilterChange,
  initialFilters,
  isOpenFromCategory,
  searchQuery,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchTerm, setSearchTerm] = useState(searchQuery || "");

  const isSearchActive = searchTerm && searchTerm.trim().length > 0;
  const isCollectionActive = initialFilters?.collections?.length > 0;
  const isDiscountFilterActive = location.search.includes("discount=true");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [openSections, setOpenSections] = useState({
    search: isSearchActive || false,
    categories: !isMobile || isOpenFromCategory,
    price: !isMobile,
    colors: !isMobile,
    collections: !isMobile || isCollectionActive,
  });

  useEffect(() => {
    if (isOpenFromCategory) {
      setOpenSections((prev) => ({
        ...prev,
        categories: true,
      }));
    }
  }, [isOpenFromCategory]);

  useEffect(() => {
    if (isSearchActive) {
      setOpenSections((prev) => ({
        ...prev,
        search: true,
      }));
    }
  }, [isSearchActive]);

  useEffect(() => {
    if (isCollectionActive) {
      setOpenSections((prev) => ({
        ...prev,
        collections: true,
      }));
    }
  }, [isCollectionActive]);

  useEffect(() => {
    setOpenSections({
      search: isSearchActive || false,
      categories: !isMobile || isOpenFromCategory,
      price: !isMobile,
      colors: !isMobile,
      collections: !isMobile || isCollectionActive,
    });
  }, [isMobile, isOpenFromCategory, isSearchActive, isCollectionActive]);

  const [selectedCategories, setSelectedCategories] = useState(
    initialFilters?.categories || [],
  );
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState(
    initialFilters?.collections || [],
  );
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 10000000,
  });

  const { categories = [], isLoading } = useGetCategories();
  const { maxPrice = 10000000 } = useGetMaxPrice();
  const { collections = [], isLoading: collectionsLoading } =
    useGetCollections();

  useEffect(() => {
    if (initialFilters?.categories) {
      setSelectedCategories(initialFilters.categories);
    }
    if (initialFilters?.collections) {
      setSelectedCollections(initialFilters.collections);
    }
  }, [initialFilters]);

  useEffect(() => {
    setPriceRange({
      min: 0,
      max: maxPrice,
    });
  }, [maxPrice]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateFilters = (
    categories = selectedCategories,
    colors = selectedColors,
    price = priceRange,
    search = searchTerm,
    collections = selectedCollections,
    discount = isDiscountFilterActive,
  ) => {
    onFilterChange({
      categories,
      colors,
      priceRange: {
        min: price.min,
        max: price.max,
      },
      search,
      collections,
      discount,
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateFilters(
      selectedCategories,
      selectedColors,
      priceRange,
      value,
      selectedCollections,
    );
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) => {
      const updated = prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];

      updateFilters(
        updated,
        selectedColors,
        priceRange,
        searchTerm,
        selectedCollections,
      );

      return updated;
    });
  };

  const handleCollectionChange = (collectionId) => {
    setSelectedCollections((prev) => {
      const updated = prev.includes(collectionId)
        ? prev.filter((id) => id !== collectionId)
        : [...prev, collectionId];

      updateFilters(
        selectedCategories,
        selectedColors,
        priceRange,
        searchTerm,
        updated,
      );

      return updated;
    });
  };

  const handleDiscountToggle = () => {
    const currentParams = new URLSearchParams(location.search);

    if (isDiscountFilterActive) {
      currentParams.delete("discount");
    } else {
      currentParams.set("discount", "true");
    }

    navigate(`/shop?${currentParams.toString()}`);
  };

  const colors = [
    { id: 1, name: "مشکی", class: "bg-black" },
    { id: 2, name: "سفید", class: "bg-white border-2 border-gray-300" },
    { id: 3, name: "قهوه‌ای", class: "bg-amber-800" },
    { id: 4, name: "آبی", class: "bg-blue-600" },
    { id: 5, name: "قرمز", class: "bg-red-600" },
    { id: 6, name: "سبز", class: "bg-green-600" },
    { id: 7, name: "زرد", class: "bg-amber-400" },
    { id: 8, name: "نارنجی", class: "bg-orange-500" },
  ];

  const toggleColor = (colorId) => {
    setSelectedColors((prev) => {
      const updated = prev.includes(colorId)
        ? prev.filter((id) => id !== colorId)
        : [...prev, colorId];

      updateFilters(
        selectedCategories,
        updated,
        priceRange,
        searchTerm,
        selectedCollections,
      );

      return updated;
    });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const numValue = Number(value);

    setPriceRange((prev) => {
      let updated;

      if (name === "min" && numValue > prev.max) {
        updated = {
          min: prev.max,
          max: numValue,
        };
      } else if (name === "max" && numValue < prev.min) {
        updated = {
          min: numValue,
          max: prev.min,
        };
      } else {
        updated = {
          ...prev,
          [name]: numValue,
        };
      }

      updateFilters(
        selectedCategories,
        selectedColors,
        updated,
        searchTerm,
        selectedCollections,
      );

      return updated;
    });
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat("fa-IR").format(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sticky top-5">
      {/* بخش جستجو */}
      <div className="border-b border-gray-200 pb-2.5 mb-2.5">
        <button
          className="flex justify-between items-center w-full font-sansBold text-stone-800 text-sm"
          onClick={() => toggleSection("search")}
        >
          <span>جستجو</span>
          {openSections.search ? (
            <HiChevronUp size={18} />
          ) : (
            <HiChevronDown size={18} />
          )}
        </button>

        {openSections.search && (
          <div className="mt-2">
            <div className="relative">
              <HiOutlineSearch
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                size={18}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="جستجوی محصولات..."
                className="w-full pr-10 pl-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-stone-400 focus:border-stone-400 focus:outline-none text-sm font-sansMed"
              />
            </div>
          </div>
        )}
      </div>
      {/* دسته‌بندی */}
      <div className="border-b border-gray-200 pb-2.5 mb-2.5">
        <button
          className="flex justify-between items-center w-full font-sansBold text-stone-800 text-sm"
          onClick={() => toggleSection("categories")}
        >
          <span>دسته‌بندی</span>
          {openSections.categories ? (
            <HiChevronUp size={18} />
          ) : (
            <HiChevronDown size={18} />
          )}
        </button>

        {openSections.categories && (
          <div className="mt-2 space-y-1.5">
            {isLoading ? (
              <div className="text-sm text-stone-400 font-sansMed">
                در حال بارگذاری...
              </div>
            ) : (
              categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center justify-between cursor-pointer text-sm text-stone-600 hover:text-stone-800 font-sansMed"
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => handleCategoryChange(cat.id)}
                      className="rounded border-gray-300 accent-stone-800 cursor-pointer"
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
      {/* قیمت */}
      <div className="border-b border-gray-200 pb-2.5 mb-2.5">
        <button
          className="flex justify-between items-center w-full font-sansBold text-stone-800 text-sm"
          onClick={() => toggleSection("price")}
        >
          <span>محدوده قیمت</span>
          {openSections.price ? (
            <HiChevronUp size={18} />
          ) : (
            <HiChevronDown size={18} />
          )}
        </button>

        {openSections.price && (
          <div className="mt-2">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="font-sansMed text-stone-600">قیمت:</span>
              <div className="flex gap-2">
                <span className="bg-stone-100 px-2.5 py-0.5 rounded-lg font-sansBold text-stone-800">
                  {formatPrice(priceRange.min)}
                </span>
                <span>—</span>
                <span className="bg-stone-100 px-2.5 py-0.5 rounded-lg font-sansBold text-stone-800">
                  {formatPrice(priceRange.max)}
                </span>
              </div>
            </div>

            <div className="relative pt-2 pb-6 px-1">
              <div className="h-1.5 bg-gray-200 rounded-full">
                <div
                  className="absolute h-1.5 bg-stone-800 rounded-full"
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
                className="absolute top-2 w-full h-1.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-stone-800 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
              />

              <input
                type="range"
                name="max"
                min={0}
                max={maxPrice}
                value={priceRange.max}
                onChange={handlePriceChange}
                className="absolute top-2 w-full h-1.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-stone-800 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
              />
            </div>
          </div>
        )}
      </div>
      {/* رنگ */}
      <div className="border-b border-gray-200 pb-2.5 mb-2.5">
        <button
          className="flex justify-between items-center w-full font-sansBold text-stone-800 text-sm"
          onClick={() => toggleSection("colors")}
        >
          <span>رنگ</span>
          {openSections.colors ? (
            <HiChevronUp size={18} />
          ) : (
            <HiChevronDown size={18} />
          )}
        </button>

        {openSections.colors && (
          <div className="mt-2">
            <div className="grid grid-cols-4 gap-2.5">
              {colors.map((color) => {
                const selected = selectedColors.includes(color.id);

                return (
                  <button
                    key={color.id}
                    onClick={() => toggleColor(color.id)}
                    className="group relative cursor-pointer flex flex-col items-center gap-0.5 transition-all duration-200"
                  >
                    <div
                      className={`
                      w-8 h-8 rounded-full
                      ${color.class}
                      shadow-sm
                      transition-all duration-200
                      ${
                        selected
                          ? "ring-2 ring-stone-800 ring-offset-1 scale-110"
                          : "hover:scale-105 hover:shadow-md"
                      }
                    `}
                    />

                    <span
                      className={`
                      text-[9px] font-sansMed transition-colors
                      ${selected ? "text-stone-800" : "text-stone-400"}
                    `}
                    >
                      {color.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedColors.length > 0 && (
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-stone-500 font-sansMed">
                  {selectedColors.length} رنگ انتخاب شده
                </span>

                <button
                  onClick={() => {
                    setSelectedColors([]);
                    updateFilters(
                      selectedCategories,
                      [],
                      priceRange,
                      searchTerm,
                      selectedCollections,
                    );
                  }}
                  className="text-xs text-stone-400 hover:text-stone-800 transition-colors font-sansMed cursor-pointer"
                >
                  حذف همه
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {/* کالکشن */}
      <div className="pt-2.5 mt-2.5">
        <button
          className="flex justify-between items-center w-full font-sansBold text-stone-800 text-sm"
          onClick={() => toggleSection("collections")}
        >
          <span>فصل</span>
          {openSections.collections ? (
            <HiChevronUp size={18} />
          ) : (
            <HiChevronDown size={18} />
          )}
        </button>

        {openSections.collections && (
          <div className="mt-2 space-y-1.5">
            {collectionsLoading ? (
              <div className="text-sm text-stone-400 font-sansMed">
                در حال بارگذاری...
              </div>
            ) : (
              collections.map((col) => (
                <label
                  key={col.id}
                  className="flex items-center gap-2 cursor-pointer text-sm text-stone-600 hover:text-stone-800 font-sansMed"
                >
                  <input
                    type="checkbox"
                    checked={selectedCollections.includes(col.id)}
                    onChange={() => handleCollectionChange(col.id)}
                    className="rounded border-gray-300 accent-stone-800 cursor-pointer"
                  />
                  {col.name}
                </label>
              ))
            )}
          </div>
        )}
      </div>

      <button
        onClick={handleDiscountToggle}
        className={`mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-sansMed transition-all duration-300 border cursor-pointer ${
          isDiscountFilterActive
            ? "bg-red-500 text-white border-red-500 hover:bg-red-600"
            : "bg-white text-stone-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
        }`}
      >
        <HiOutlineFire
          className={`text-base ${isDiscountFilterActive ? "text-white" : "text-red-400"}`}
        />
        فقط کالاهای تخفیف‌دار
      </button>
    </div>
  );
}

export default ShopSidebar;
