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
    // اگر در صفحه اصلی نیستیم، به صفحه اصلی برو با state
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToCategories: true } });
    } else {
      // اگر در صفحه اصلی هستیم، اسکرول کن
      if (typeof window.scrollToCategories === "function") {
        window.scrollToCategories();
      } else {
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`bg-caffee-200 flex flex-col relative z-100 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ position: "sticky", top: 0 }}
    >
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
