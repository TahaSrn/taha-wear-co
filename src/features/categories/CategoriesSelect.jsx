import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import useGetCategories from "./useGetCategories";

function CategoriesSelect() {
  const navigate = useNavigate();
  const { categories = [], isLoading } = useGetCategories();

  const handleCategoryClick = (categoryId) => {
    if (categoryId) {
      navigate(`/shop?category=${categoryId}`);
    } else {
      navigate("/shop");
    }
  };

  return (
    <div className="flex font-sansMed items-center justify-between py-1.5">
      <div className="flex items-center gap-3">
        <div
          className="
      relative
      w-48
      group
      text-gray-600
      mr-20
      "
        >
          <div
            className="
            
          h-[46px]
          px-4
          rounded-full
          flex
          items-center
          justify-between
          text-gray-600
          text-sm
          font-sansMed
          cursor-pointer
          after:text-gray-500 
          "
          >
            دسته بندی محصولات {<IoIosArrowDown />}
          </div>

          <div
            className="
          absolute
          top-12
          right-0
          w-full
          bg-white
          rounded-2xl
          shadow-lg
          p-2
          opacity-0
          invisible
          group-hover:opacity-100
          group-hover:visible
          transition-all
          duration-300
          text-sm
          z-2
          "
          >
            <p
              onClick={() => handleCategoryClick(null)}
              className="px-3 py-2 rounded-xl hover:bg-gray-100 cursor-pointer"
            >
              همه محصولات
            </p>

            {isLoading ? (
              <p className="px-3 py-2 text-gray-400">در حال بارگذاری...</p>
            ) : (
              categories.map((category) => (
                <p
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="px-3 py-2 rounded-xl hover:bg-gray-100 cursor-pointer"
                >
                  {category.name}
                </p>
              ))
            )}
          </div>
        </div>

        <div className="flex gap-4 text-gray-600 text-sm relative z-1">
          <Link className="hover:text-gray-900" to="/">
            خانه
          </Link>
          <Link className="hover:text-gray-900" to="/shop">
            فروشگاه
          </Link>
          <Link className="hover:text-gray-900" to="/about-us">
            درباره ما
          </Link>
          <Link className="hover:text-gray-900" to="/contact-us">
            تماس با ما
          </Link>
        </div>
      </div>

      <div className="hidden md:block bg-slate-100 px-4 py-2.5 text-gray-600 text-[12px] ml-21 rounded-full">
        مدت زمان ارسال برای تمامی سفارشات 5 روز کاری میباشد
      </div>
    </div>
  );
}

export default CategoriesSelect;
