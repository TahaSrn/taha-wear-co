// src/features/products/DiscountBanner.jsx
import { Link } from "react-router";
import { HiOutlineFire } from "react-icons/hi";

const octagonClip =
  "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";

function DiscountBanner() {
  return (
    <div className="relative h-full bg-gradient-to-br from-stone-800 via-stone-900 to-stone-800 text-white flex flex-col items-center justify-center px-6 py-10 md:py-12 overflow-hidden">
      {/* بافت گره‌چینی به‌جای دایره‌های تار */}
      <svg
        className="absolute inset-0 w-full h-full text-amber-400/[0.05] pointer-events-none"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="girih-discount-banner"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20 2 L34 10 L34 30 L20 38 L6 30 L6 10 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            />
            <path
              d="M20 2 L38 20 L20 38 L2 20 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#girih-discount-banner)" />
      </svg>

      {/* مدال هشت‌ضلعی به سبک مهر بازار */}
      <div className="relative w-20 h-20 mb-5">
        <div
          className="absolute inset-0 bg-red-500/15"
          style={{ clipPath: octagonClip }}
        />
        <div
          className="absolute inset-[5px] bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/30"
          style={{ clipPath: octagonClip }}
        >
          <HiOutlineFire className="text-white text-3xl" />
        </div>
      </div>

      {/* متن */}
      <div className="relative text-center">
        <h3 className="font-sansBold text-2xl md:text-3xl leading-relaxed">
          پیشنهادات
          <br />
          <span className="text-amber-400">شگفت‌انگیز</span>
        </h3>

        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="inline-block w-6 h-0.5 bg-amber-400/50" />
          <span className="w-1.5 h-1.5 rotate-45 bg-amber-400" />
          <span className="text-amber-400 font-sansBold text-sm">
            تخفیف‌های ویژه
          </span>
          <span className="w-1.5 h-1.5 rotate-45 bg-amber-400" />
          <span className="inline-block w-6 h-0.5 bg-amber-400/50" />
        </div>

        <p className="mt-4 text-stone-300 text-sm md:text-base leading-relaxed max-w-[180px] mx-auto">
          بهترین محصولات
          <br />
          با بهترین قیمت‌ها
        </p>
      </div>

      {/* دکمه */}
      <Link
        to="/shop"
        className="relative mt-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-sansBold text-sm md:text-base px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
      >
        مشاهده همه
      </Link>
    </div>
  );
}

export default DiscountBanner;
