// src/features/categories/Category.jsx
import { Link } from "react-router";
import { HiChevronLeft } from "react-icons/hi";

function Category({ category }) {
  return (
    <Link
      to={`/shop?category=${category.id}`}
      className="rounded-xl bg-white w-[90%] mx-auto h-100 flex flex-col items-center justify-center font-sansBold relative overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-105"
    >
      <img
        className="w-[98%] h-[98%] object-cover rounded-xl transition-transform duration-300 cursor-pointer"
        src={category.image}
        alt={category.image}
      />

      <div className="text-stone-800 cursor-pointer absolute text-lg flex items-center gap-2 bg-slate-100 py-3 px-10 rounded-full right-10 bottom-10">
        <span>{category.name}</span>
        <HiChevronLeft />
      </div>
    </Link>
  );
}

export default Category;
