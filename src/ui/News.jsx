// src/pages/News.jsx
import { useState } from "react";
import toast from "react-hot-toast";

function News() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("لطفاً ایمیل خود را وارد کنید");
      return;
    }
    toast.success("با موفقیت در خبرنامه ثبت نام کردید! ✅");
    setEmail("");
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 mt-8 md:mt-12 mb-6 md:mb-8">
      <div className="relative overflow-hidden rounded-2xl max-h-[280px] md:max-h-[320px] flex items-center justify-center">
        <img
          src="/news.png"
          alt="عضویت در خبرنامه"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-5 max-w-[320px] md:max-w-sm w-full mx-4 shadow-lg">
            <p className="text-stone-500 font-sansMed text-[10px] md:text-xs text-center mb-3">
              از تخفیف‌ها و محصولات جدید مطلع شوید
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ایمیل شما"
                className="w-full px-3 py-2 rounded-lg border border-stone-200 focus:ring-2 focus:ring-stone-800 focus:border-stone-800 focus:outline-none font-sansMed text-xs md:text-sm bg-white/80"
              />
              <button
                type="submit"
                className="w-full bg-stone-800 text-white py-2 rounded-lg hover:bg-stone-700 transition-all duration-300 font-sansBold text-xs md:text-sm cursor-pointer"
              >
                ثبت نام
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
