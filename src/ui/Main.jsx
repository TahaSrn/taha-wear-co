// src/pages/Main.jsx (یا Homepage.jsx)
import { useRef } from "react";
import Categories from "../features/categories/Categories";
import { HiOutlineFolderOpen, HiOutlineSparkles } from "react-icons/hi";
import CategorySubject from "../features/categories/CategorySubject";
import NewestProducts from "../features/products/NewestProducts";
import KnowledgeSection from "../features/knowledge/KnowledgeSection";

function Main() {
  const categoriesRef = useRef(null);

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
