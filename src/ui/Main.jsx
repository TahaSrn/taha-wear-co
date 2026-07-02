import Categories from "../features/categories/Categories";
import { HiOutlineFolderOpen, HiOutlineSparkles } from "react-icons/hi";
import CategorySubject from "../features/categories/CategorySubject";
import NewestProducts from "../features/products/NewestProducts";
import KnowledgeSection from "../features/knowledge/KnowledgeSection";

function Main() {
  return (
    <main className="bg-caffee-50 text-center">
      <div className="py-12">
        <CategorySubject icon={HiOutlineSparkles} title="جدید ترین محصولات" />
        <NewestProducts />
      </div>

      <div>
        <CategorySubject icon={HiOutlineFolderOpen} title="دسته بندی محصولات" />
        <Categories />
      </div>

      <KnowledgeSection />
    </main>
  );
}

export default Main;
