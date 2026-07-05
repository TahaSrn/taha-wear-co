// src/features/categories/Categories.jsx
import Category from "./Category";
import useGetCategories from "./useGetCategories";
import Spinner from "../../ui/Spinner";

function Categories({ onCloseMenu }) {
  const { categories = [], isLoading } = useGetCategories();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 px-4 max-w-7xl mx-auto pb-20">
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-72 rounded-xl bg-gray-100 flex items-center justify-center"
            >
              <Spinner />
            </div>
          ))
        : categories.map((category) => (
            <Category
              key={category.id}
              category={category}
              onCloseMenu={onCloseMenu}
            />
          ))}
    </div>
  );
}

export default Categories;
