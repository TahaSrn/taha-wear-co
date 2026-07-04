// src/pages/Main.jsx (یا Homepage.jsx)
import { useRef, useEffect } from "react";
import { useLocation } from "react-router";
import Categories from "../features/categories/Categories";
import { HiOutlineFolderOpen, HiOutlineSparkles } from "react-icons/hi";
import CategorySubject from "../features/categories/CategorySubject";
import NewestProducts from "../features/products/NewestProducts";
import KnowledgeSection from "../features/knowledge/KnowledgeSection";

function Main() {
  const categoriesRef = useRef(null);
  const location = useLocation();

  const scrollToCategories = () => {
    if (categoriesRef.current) {
      const offset = 80;
      const elementPosition = categoriesRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // وقتی از منو به صفحه اصلی میایم و state.scrollToCategories=true هست، اسکرول کن
  useEffect(() => {
    if (location.state?.scrollToCategories) {
      setTimeout(() => {
        scrollToCategories();
        // پاک کردن state بعد از اسکرول
        window.history.replaceState({}, document.title);
      }, 150);
    }
  }, [location]);

  window.scrollToCategories = scrollToCategories;

  return (
    <main className="bg-caffee-50 text-center">
      <div className="py-12">
        <CategorySubject icon={HiOutlineSparkles} title="جدید ترین محصولات" />
        <NewestProducts />
      </div>

      <div ref={categoriesRef} id="categories-section">
        <CategorySubject icon={HiOutlineFolderOpen} title="دسته بندی محصولات" />
        <Categories />
      </div>

      <KnowledgeSection />
    </main>
  );
}

export default Main;
