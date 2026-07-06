// src/pages/Banners.jsx
import { Link } from "react-router";

function Banners() {
  return (
    <div className="px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Link
          to="/shop?collection=4"
          className="block overflow-hidden rounded-xl border border-caffee-300 transition-transform duration-300 hover:scale-[1.02]"
        >
          <img
            src="/banner1.jpg"
            alt="بنر زمستان"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </Link>

        <Link
          to="/shop?collection=3"
          className="block overflow-hidden rounded-xl border border-caffee-300 transition-transform duration-300 hover:scale-[1.02]"
        >
          <img
            src="/banner2.jpg"
            loading="lazy"
            alt="بنر پاییز"
            className="w-full h-full object-cover object-[10%_center]"
          />
        </Link>
      </div>
    </div>
  );
}

export default Banners;
