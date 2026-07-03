// src/features/categories/Categories.jsx
import Category from "./Category";
import useGetCategories from "./useGetCategories";
import Spinner from "../../ui/Spinner";

function Categories({ onCloseMenu }) {
  const { categories = [], isLoading } = useGetCategories();

  return (
    <div className="grid grid-cols-1 pb-20 md:grid-cols-2 px-4 gap-x-0 gap-y-8 md:px-8">
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-[90%] mx-auto h-100 rounded-xl bg-gray-100 flex items-center justify-center"
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
