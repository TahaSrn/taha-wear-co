
import { Link } from "react-router";
import { HiChevronLeft } from "react-icons/hi";
import {
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineFolderOpen } from
"react-icons/hi";

function MenuItems({ onClose, onCategoryClick }) {
  const links = [
  { id: 1, to: "/", label: "خانه", icon: HiOutlineHome },
  { id: 2, to: "/shop", label: "فروشگاه", icon: HiOutlineShoppingBag },
  { id: 3, to: "/about-us", label: "درباره ما", icon: HiOutlineUser },
  { id: 4, to: "/contact-us", label: "تماس با ما", icon: HiOutlineHeart }];


  const handleCategoryClick = () => {
    if (onClose) onClose();
    if (onCategoryClick) onCategoryClick();
  };

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <nav className="space-y-3">
      <div
        className="flex items-center justify-between p-3 bg-stone-200 rounded-xl hover:bg-blue-100 cursor-pointer transition-colors"
        onClick={handleCategoryClick}>
        
        <span className="flex items-center gap-2 text-sm font-sansBold text-stone-700">
          <HiOutlineFolderOpen className="text-xl text-stone-700" />
          دسته‌بندی محصولات
        </span>
        <HiChevronLeft className="text-xl text-stone-700" />
      </div>

      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.id}
            to={link.to}
            className="flex items-center gap-2 p-3 rounded-xl hover:bg-gray-100 transition-colors text-sm font-sansMed text-stone-700"
            onClick={handleLinkClick}>
            
            <Icon className="text-xl text-stone-500" />
            {link.label}
          </Link>);

      })}
    </nav>);

}

export default MenuItems;