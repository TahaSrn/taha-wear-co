import { useEffect, useState } from "react";
import { Link } from "react-router";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import Ballpit from "../ui/Ballpit";
import CategorySubject from "../features/categories/CategorySubject";
import {
  HiOutlineSparkles,
  HiOutlineHeart,
  HiOutlineShieldCheck,
  HiOutlineLightningBolt,
  HiOutlineShoppingBag,
  HiOutlineUsers,
  HiOutlineStar,
} from "react-icons/hi";
import MobileTabs from "../ui/MobileTabs";

const values = [
  {
    icon: HiOutlineSparkles,
    title: "طراحی اصیل",
    description:
      "هر لباس با الهام از ترندهای روز و هویت بصری برند، با دقت طراحی می‌شود.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "کیفیت ماندگار",
    description:
      "از انتخاب پارچه تا دوخت نهایی، استانداردهای کیفی ما تغییر نمی‌کند.",
  },
  {
    icon: HiOutlineHeart,
    title: "تجربه دلنشین",
    description:
      "خرید برای ما فقط یک تراکنش نیست؛ یک تجربه لذت‌بخش و قابل اعتماد است.",
  },
  {
    icon: HiOutlineLightningBolt,
    title: "ارسال سریع",
    description: "سفارش شما در کوتاه‌ترین زمان آماده و به دستتان می‌رسد.",
  },
];

const stats = [
  { icon: HiOutlineShoppingBag, value: "+۵۰۰", label: "محصول متنوع" },
  { icon: HiOutlineUsers, value: "+۱۰K", label: "مشتری راضی" },
  { icon: HiOutlineStar, value: "۴.۸", label: "امتیاز کاربران" },
];

function AboutUs() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-caffee-50">
        <div className="relative">
          <div
            className="absolute inset-0 w-full"
            style={{ height: "calc(100% - 100px)" }}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 -top-20 z-1">
                <Ballpit
                  count={isMobile ? 25 : 40}
                  colors={[0x2e2724, 0x4a403a, 0x6b5e58, 0xa89888, 0xd4c4b0]}
                  ambientColor={0xfbf8f5}
                  ambientIntensity={1.2}
                  lightIntensity={160}
                  minSize={isMobile ? 0.3 : 0.35}
                  maxSize={isMobile ? 0.6 : 0.8}
                  size0={1}
                  gravity={0.3}
                  followCursor={false}
                />
              </div>
              <div className="absolute inset-0 bg-caffee-50/70 backdrop-blur-[2px]" />
            </div>
          </div>

          <section className="relative z-10 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-stone-600 text-sm font-sansMed mb-6 border border-caffee-300/50 shadow-sm">
                  داستان Taha Wear
                </span>
                <h1 className="text-3xl md:text-5xl font-sansBold text-stone-800 leading-tight mb-6">
                  مد را با اصالت و
                  <span className="text-stone-600"> راحتی </span>
                  تجربه کنید
                </h1>
                <p className="text-stone-600 font-sansMed text-base md:text-lg leading-relaxed">
                  Taha Wear از یک ایده ساده شروع شد: لباسی که هم زیبا باشد، هم
                  راحت، و هم در طول زمان کیفیت خود را حفظ کند. امروز با افتخار
                  مجموعه‌ای از استایل‌های روز را برای شما گردآوری کرده‌ایم.
                </p>
              </div>
            </div>
          </section>

          <section className="relative z-10 max-w-7xl mx-auto px-4 pb-14 md:pb-20">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="relative order-2 md:order-1 z-0">
                <div className="rounded-3xl overflow-hidden shadow-xl bg-white p-1 max-h-150">
                  <img
                    src="/shop.jpg"
                    alt="Taha Wear"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-stone-800 text-white rounded-2xl px-6 py-4 shadow-lg">
                  <p className="text-2xl font-sansBold">+۳ سال</p>
                  <p className="text-sm text-stone-400 font-sansMed">
                    در کنار شما
                  </p>
                </div>
              </div>

              <div className="order-1 md:order-2 space-y-6">
                <CategorySubject icon={HiOutlineHeart} title="ما کی هستیم؟" />
                <p className="text-stone-700 font-sansMed leading-relaxed text-base md:text-lg text-right">
                  Taha Wear یک فروشگاه آنلاین پوشاک است که بر سبک زندگی مدرن،
                  کیفیت بالا و قیمت منصفانه تمرکز دارد. ما معتقدیم هر فردی
                  شایسته لباسی است که هم شخصیتش را نشان دهد و هم در استفاده
                  روزمره راحت باشد.
                </p>
                <p className="text-stone-600 font-sansMed leading-relaxed text-base">
                  تیم ما هر روز در جستجوی بهترین پارچه‌ها، جدیدترین مدل‌ها و
                  راه‌هایی برای بهبود تجربه خرید شماست — از انتخاب محصول تا
                  تحویل درب منزل.
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-stone-800 text-white font-sansBold text-sm hover:bg-stone-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <HiOutlineShoppingBag size={18} />
                  مشاهده فروشگاه
                </Link>
              </div>
            </div>
          </section>

          <div className="relative z-10 h-24 bg-linear-to-b from-transparent to-caffee-50" />
        </div>

        <section className="relative z-10 bg-caffee-50 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="text-center bg-white/60 backdrop-blur-sm rounded-2xl py-6 md:py-8 border border-white/80 shadow-sm"
                >
                  <Icon className="text-2xl md:text-3xl text-stone-700 mx-auto mb-2" />
                  <p className="text-xl md:text-3xl font-sansBold text-stone-800">
                    {value}
                  </p>
                  <p className="text-xs md:text-sm text-stone-500 font-sansMed mt-1">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 max-w-7xl mx-auto px-4 py-14 md:py-20 bg-caffee-50">
          <div className="mb-10 md:mb-14">
            <CategorySubject icon={HiOutlineSparkles} title="ارزش‌های ما" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-caffee-100"
              >
                <div className="w-14 h-14 rounded-2xl bg-caffee-100 flex items-center justify-center mb-5 group-hover:bg-caffee-200 transition-colors">
                  <Icon className="text-2xl text-stone-700" />
                </div>
                <h3 className="text-lg font-sansBold text-stone-800 mb-2">
                  {title}
                </h3>
                <p className="text-stone-500 font-sansMed text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 max-w-7xl mx-auto px-4 pb-16 md:pb-24 bg-caffee-50">
          <div className="relative overflow-hidden rounded-3xl bg-stone-800 text-white px-6 py-12 md:px-16 md:py-16 text-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-caffee-300 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-caffee-200 blur-3xl" />
            </div>
            <div className="relative max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-sansBold mb-4">
                ماموریت ما
              </h2>
              <p className="text-stone-300 font-sansMed leading-relaxed text-base md:text-lg">
                ساختن جامعه‌ای از افرادی که با اعتماد به نفس و راحتی، استایل
                شخصی خود را زندگی می‌کنند — و Taha Wear همراه این مسیر است.
              </p>
              <Link
                to="/contact-us"
                className="inline-block mt-8 px-8 py-3 rounded-full bg-caffee-200 text-stone-800 font-sansBold text-sm hover:bg-caffee-100 transition-all duration-300 hover:shadow-lg"
              >
                با ما در ارتباط باشید
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileTabs />
    </div>
  );
}

export default AboutUs;
