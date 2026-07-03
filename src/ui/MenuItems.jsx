// src/features/menu/MenuItems.jsx
import { Link } from "react-router";
import { HiChevronLeft } from "react-icons/hi";

function MenuItems({ onClose, onCategoryClick }) {
  const links = [
    { id: 1, to: "/", label: "🏠 خانه" },
    { id: 2, to: "/shop", label: "🛍️ فروشگاه" },
    { id: 3, to: "/about-us", label: "ℹ️ درباره ما" },
    { id: 4, to: "/contact-us", label: "📞 تماس با ما" },
  ];

  const handleCategoryClick = () => {
    if (onClose) onClose();
    if (onCategoryClick) onCategoryClick();
  };

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <nav className="space-y-4">
      <div
        className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors"
        onClick={handleCategoryClick}
      >
        <span className="text-lg font-medium text-blue-900">
          📂 دسته‌بندی محصولات
        </span>
        <HiChevronLeft className="text-2xl text-blue-600" />
      </div>

      {links.map((link) => (
        <Link
          key={link.id}
          to={link.to}
          className="block p-3 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={handleLinkClick}
        >
          <span className="text-lg">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export default MenuItems;
