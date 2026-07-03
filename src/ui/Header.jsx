// src/ui/Header.jsx
import { useRef } from "react";
import { useLocation } from "react-router";
import CategoriesSelect from "../features/categories/CategoriesSelect";
import IconBar from "./IconBar";
import Logo from "./Logo";
import Menu from "./Menu";
import Search from "./Search";

function Header() {
  const location = useLocation();

  const handleCategoryClick = () => {
    // فقط در صفحه اصلی اسکرول کن
    if (location.pathname === "/") {
      // از تابع exposed شده در Main استفاده کن
      if (typeof window.scrollToCategories === "function") {
        window.scrollToCategories();
      } else {
        // Fallback: پیدا کردن المنت با id
        const categoriesSection = document.getElementById("categories-section");
        if (categoriesSection) {
          const offset = 80;
          const elementPosition = categoriesSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    }
  };

  return (
    <header className="bg-caffee-200 flex flex-col relative z-100">
      <div className="block md:hidden absolute z-30 right-0 top-1/2 -translate-y-1/2">
        <Menu onCategoryClick={handleCategoryClick} />
      </div>
      <div className="flex items-center justify-center md:justify-start relative mt-4 md:mt-1 pb-4 md:pb-0">
        <Logo />
        <div className="w-[75%] h-full mr-10 hidden md:block">
          <Search />
        </div>
        <IconBar />
      </div>

      <div className="hidden md:block">
        <CategoriesSelect />
      </div>
    </header>
  );
}

export default Header;
