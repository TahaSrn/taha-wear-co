// src/ui/Header.jsx
import { useState, useEffect, useCallback, memo } from "react";
import { useLocation, useNavigate } from "react-router";
import { useScrollVisibility } from "../hooks/useScrollVisibility";

import CategoriesSelect from "../features/categories/CategoriesSelect";
import IconBar from "./IconBar";
import Logo from "./Logo";
import Menu from "./Menu";
import Search from "./Search";

// کامپوننت‌های داخلی رو memo کنیم
const MemoizedCategoriesSelect = memo(CategoriesSelect);
const MemoizedIconBar = memo(IconBar);
const MemoizedLogo = memo(Logo);
const MemoizedMenu = memo(Menu);
const MemoizedSearch = memo(Search);

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isVisible = useScrollVisibility();

  const handleCategoryClick = useCallback(() => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToCategories: true } });
      return;
    }

    if (typeof window.scrollToCategories === "function") {
      window.scrollToCategories();
      return;
    }

    const categoriesSection = document.getElementById("categories-section");

    if (categoriesSection) {
      const offset = 80;
      const top =
        categoriesSection.getBoundingClientRect().top +
        window.pageYOffset -
        offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  }, [location.pathname, navigate]);

  return (
    <header
      className={`sticky top-0 z-50 bg-gradient-to-b from-caffee-200 to-caffee-100 border-b border-caffee-300/40 shadow-sm transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Mobile Menu */}
      <div className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 z-30">
        <MemoizedMenu onCategoryClick={handleCategoryClick} />
      </div>

      {/* Top Row */}
      <div className="hidden md:flex items-center gap-8 px-8 py-3">
        <MemoizedLogo />

        <div className="flex-1 min-w-0 pr-10">
          <MemoizedSearch />
        </div>

        <MemoizedIconBar />
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-center py-4">
        <MemoizedLogo mobile />
        <MemoizedIconBar mobile />
      </div>

      {/* Bottom Row */}
      <div className="hidden md:block">
        <MemoizedCategoriesSelect />
      </div>
    </header>
  );
}

// جلوگیری از رندر مجدد Header در صورت عدم تغییر props
export default memo(Header);
