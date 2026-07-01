import { Link } from "react-router";
import { HiChevronLeft } from "react-icons/hi";

function MenuItems({ onClose }) {
  const links = [
    { id: 1, to: "/", label: "🏠 خانه" },
    { id: 2, to: "/shop", label: "🛍️ فروشگاه" },
    { id: 3, to: "/about-us", label: "ℹ️ درباره ما" },
    { id: 4, to: "/contact-us", label: "📞 تماس با ما" },
  ];

  return (
    <nav className="space-y-4">
      <div
        className="flex items-center justify-between p-3 bg-caffee-100 rounded-lg cursor-pointer transition-colors"
        onClick={onClose}
      >
        <span className="text-lg font-medium text-stone-800">
          📂 دسته‌بندی محصولات
        </span>
        <HiChevronLeft className="text-2xl text-stone-800" />
      </div>

      {links.map((link) => (
        <Link
          key={link.id}
          to={link.to}
          className="block p-3 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={onClose}
        >
          <span className="text-lg">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export default MenuItems;
