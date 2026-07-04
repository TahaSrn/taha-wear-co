// src/ui/Header.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import CategoriesSelect from "../features/categories/CategoriesSelect";
import IconBar from "./IconBar";
import Logo from "./Logo";
import Menu from "./Menu";
import Search from "./Search";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleCategoryClick = () => {
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
  };

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current === 0) {
        setIsVisible(true);
        setLastScrollY(current);
        return;
      }

      setIsVisible(current < lastScrollY);

      setLastScrollY(current);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`sticky top-0 z-50 bg-gradient-to-b from-caffee-200 to-caffee-100 border-b border-caffee-300/40 shadow-sm transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Mobile Menu */}
      <div className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 z-30">
        <Menu onCategoryClick={handleCategoryClick} />
      </div>

      {/* Top Row */}
      <div className="hidden md:flex items-center gap-8 px-8 py-3">
        <Logo />

        <div className="flex-1 min-w-0 pr-10">
          <Search />
        </div>

        <IconBar />
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-center py-4">
        <Logo mobile />
        <IconBar mobile />
      </div>

      {/* Bottom Row */}
      <div className="hidden md:block">
        <CategoriesSelect />
      </div>
    </header>
  );
}

export default Header;
