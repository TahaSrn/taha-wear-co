import { useEffect, useState } from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import CategorySubject from "../features/categories/CategorySubject";
import toast from "react-hot-toast";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineChatAlt2,
  HiOutlineUser,
  HiOutlinePaperAirplane,
} from "react-icons/hi";
import { FaLinkedin, FaGithub, FaTelegramPlane } from "react-icons/fa";
import MobileTabs from "../ui/MobileTabs";

const contactInfo = [
  {
    icon: HiOutlinePhone,
    title: "تلفن",
    value: "09304130229",
    href: "tel:+989304130229",
  },
  {
    icon: HiOutlineMail,
    title: "ایمیل",
    value: "tahaahmadi0403@gmail.com",
    href: "mailto:tahaahmadi0403@gmail.com",
  },
  {
    icon: HiOutlineLocationMarker,
    title: "آدرس",
    value: "مازندران ، نور",
    href: null,
  },
  {
    icon: HiOutlineClock,
    title: "ساعات پاسخگویی",
    value: "شنبه تا پنج‌شنبه، ۹ تا ۱۸",
    href: null,
  },
];

const socialLinks = [
  {
    icon: FaLinkedin,
    label: "لینکدین",
    href: "https://www.linkedin.com/in/tahaahmadi0403/",
    hoverColor: "hover:text-blue-400",
  },
  {
    icon: FaGithub,
    label: "گیت‌هاب",
    href: "https://github.com/TahaSrn",
    hoverColor: "hover:text-white",
  },
  {
    icon: FaTelegramPlane,
    label: "تلگرام",
    href: "https://t.me/Taha_TNT",
    hoverColor: "hover:text-sky-400",
  },
];

function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    toast.success("پیام شما با موفقیت ارسال شد. به زودی پاسخ می‌دهیم!");
    setForm({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-caffee-50">
        <section className="relative overflow-hidden bg-gradient-to-br from-caffee-200 via-caffee-100 to-caffee-50 py-14 md:py-20">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-caffee-300 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-white blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <CategorySubject icon={HiOutlineChatAlt2} title="تماس با ما" />
            <p className="max-w-xl mx-auto text-stone-600 font-sansMed text-base md:text-lg leading-relaxed mt-2">
              سوال، پیشنهاد یا انتقادی دارید؟ خوشحال می‌شویم از شما بشنویم. تیم
              پشتیبانی Taha Wear در کنار شماست.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12 md:py-16 -mt-4">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-4">
              {contactInfo.map(({ icon: Icon, title, value, href }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-md border border-caffee-100 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-caffee-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-xl text-stone-700" />
                  </div>
                  <div>
                    <p className="text-sm text-stone-500 font-sansMed mb-0.5">
                      {title}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-stone-800 font-sansBold hover:text-stone-600 transition-colors"
                        dir="ltr"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-stone-800 font-sansBold">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="bg-stone-800 rounded-2xl p-6 text-white">
                <p className="font-sansBold mb-4">ما را دنبال کنید</p>
                <div className="flex gap-4">
                  {socialLinks.map(
                    ({ icon: Icon, label, href, hoverColor }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className={`text-stone-400 ${hoverColor} transition-colors text-2xl`}
                      >
                        <Icon />
                      </a>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-10 border border-white/50">
                <h2 className="text-xl md:text-2xl font-sansBold text-stone-800 mb-2">
                  پیام خود را بفرستید
                </h2>
                <p className="text-stone-500 font-sansMed text-sm mb-8">
                  فرم زیر را پر کنید؛ معمولاً ظرف ۲۴ ساعت پاسخ می‌دهیم.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-sansMed text-stone-600 mb-1.5">
                        نام و نام خانوادگی
                      </label>
                      <div className="relative">
                        <HiOutlineUser
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                          size={20}
                        />

                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full pr-11 pl-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-caffee-300 focus:border-caffee-300 focus:outline-none font-sansMed bg-stone-50/50 transition-all"
                          placeholder="نام شما"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-sansMed text-stone-600 mb-1.5">
                        ایمیل
                      </label>
                      <div className="relative">
                        <HiOutlineMail
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                          size={20}
                        />

                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full pr-11 pl-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-caffee-300 focus:border-caffee-300 focus:outline-none font-sansMed bg-stone-50/50 transition-all"
                          placeholder="example@email.com"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-sansMed text-stone-600 mb-1.5">
                      موضوع
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-caffee-300 focus:border-caffee-300 focus:outline-none font-sansMed bg-stone-50/50 transition-all"
                      placeholder="موضوع پیام"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-sansMed text-stone-600 mb-1.5">
                      پیام
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-caffee-300 focus:border-caffee-300 focus:outline-none font-sansMed bg-stone-50/50 transition-all resize-none"
                      placeholder="پیام خود را اینجا بنویسید..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-3.5 rounded-xl font-sansBold text-white bg-stone-800 hover:bg-stone-700 transition-all duration-300 text-sm ${
                      loading
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                    }`}
                  >
                    <HiOutlinePaperAirplane size={18} />
                    {loading ? "در حال ارسال..." : "ارسال پیام"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 pb-16 md:pb-24">
          <div className="rounded-3xl overflow-hidden shadow-lg border border-caffee-200 h-64 md:h-80">
            <iframe
              src="https://neshan.org/maps/iframe/places/nur-city#c36.573-52.021-14z-0p/36.57322947639932/52.01010857582081"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقعیت فروشگاه Taha Wear"
              className="w-full h-full"
            />
          </div>
        </section>
      </main>

      <Footer />
      <MobileTabs />
    </div>
  );
}

export default ContactUs;
