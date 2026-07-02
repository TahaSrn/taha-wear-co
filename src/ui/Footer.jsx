// src/ui/Footer.jsx
import { Link } from "react-router";
import {
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import {
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-stone-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div>
            <h4 className="text-lg font-sansBold mb-3 md:mb-4">درباره ما</h4>
            <p className="text-stone-400 text-sm font-sansMed leading-relaxed">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-sansBold mb-3 md:mb-4">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-stone-400 hover:text-white transition-colors flex items-center gap-2 font-sansMed"
                >
                  <HiOutlineHome size={18} />
                  خانه
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-stone-400 hover:text-white transition-colors flex items-center gap-2 font-sansMed"
                >
                  <HiOutlineShoppingBag size={18} />
                  فروشگاه
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="text-stone-400 hover:text-white transition-colors flex items-center gap-2 font-sansMed"
                >
                  <HiOutlineUser size={18} />
                  درباره ما
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-stone-400 hover:text-white transition-colors flex items-center gap-2 font-sansMed"
                >
                  <HiOutlineHeart size={18} />
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-sansBold mb-3 md:mb-4">تماس با ما</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li className="flex items-center gap-2 font-sansMed">
                <HiOutlinePhone size={18} />
                09304130229
              </li>
              <li className="flex items-center gap-2 font-sansMed">
                <HiOutlineMail size={18} />
                tahaahmadi0403@gmail.com
              </li>
              <li className="flex items-center gap-2 font-sansMed">
                <HiOutlineLocationMarker size={18} />
                مازندران ، نور
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-sansBold mb-3 md:mb-4">
              ما را دنبال کنید
            </h4>
            <div className="flex gap-4 flex-wrap">
              <a
                href="https://github.com/TahaSrn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-white transition-colors text-2xl"
                aria-label="گیت‌هاب"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/tahaahmadi0403/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-blue-400 transition-colors text-2xl"
                aria-label="لینکدین"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://t.me/Taha_TNT"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-sky-400 transition-colors text-2xl"
                aria-label="تلگرام"
              >
                <FaTelegramPlane />
              </a>
              <a
                href="#"
                className="text-stone-400 hover:text-pink-500 transition-colors text-2xl"
                aria-label="اینستاگرام"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-stone-400 hover:text-green-500 transition-colors text-2xl"
                aria-label="واتساپ"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-700 mt-6 md:mt-8 pt-6 text-center text-sm text-stone-400 font-sansMed">
          <p>تمامی حقوق محفوظ است © {new Date().getFullYear()} Taha Wear</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
