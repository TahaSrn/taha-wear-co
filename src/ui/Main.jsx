import Categories from "../features/categories/Categories";
import { HiOutlineFolderOpen, HiOutlineSparkles } from "react-icons/hi";
import CategorySubject from "../features/categories/CategorySubject";

function Main() {
  return (
    <main className="bg-caffee-50 py-10 text-center">
      <CategorySubject icon={HiOutlineSparkles} title="جدید ترین محصولات" />
      <CategorySubject icon={HiOutlineFolderOpen} title="دسته بندی محصولات" />
      <Categories />
    </main>
  );
}

export default Main;
