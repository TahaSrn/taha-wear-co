
import { useRef, useEffect } from "react";
import { useLocation } from "react-router";
import Categories from "../features/categories/Categories";
import { HiOutlineFolderOpen } from "react-icons/hi";
import CategorySubject from "../features/categories/CategorySubject";
import NewestProducts from "../features/products/NewestProducts";
import DiscountProducts from "../features/products/DiscountProducts";
import KnowledgeSection from "../features/knowledge/KnowledgeSection";
import Banner from "../ui/Banner";
import Banners from "./Banners";
import News from "./News";
import FloatingFAQ from "./FloatingFAQ";

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
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    if (location.state?.scrollToCategories) {
      setTimeout(() => {
        scrollToCategories();
        window.history.replaceState({}, document.title);
      }, 150);
    }
  }, [location]);

  window.scrollToCategories = scrollToCategories;

  return (
    <main className="bg-caffee-50 text-center">
      <Banner />
      <div className="py-8 md:py-12">
        <NewestProducts />
      </div>

      <Banners />

      <div className="py-8 md:py-12">
        <DiscountProducts />
      </div>

      <div ref={categoriesRef} id="categories-section" className="pt-8">
        <CategorySubject icon={HiOutlineFolderOpen} title="دسته بندی محصولات" />
        <Categories />
      </div>

      <KnowledgeSection />

      <News />

      <FloatingFAQ />
    </main>);

}

export default Main;