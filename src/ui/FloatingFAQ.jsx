import { useState } from "react";
import { HiOutlineQuestionMarkCircle, HiOutlineX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    id: 1,
    question: "هزینه ارسال چقدر است؟",
    answer: "ارسال برای تمام سفارش‌ها کاملاً رایگان است.",
  },
  {
    id: 2,
    question: "مدت زمان تحویل سفارش چقدر است؟",
    answer:
      "سفارشات معمولاً بین ۵ تا ۱۰ روز کاری پس از ثبت سفارش به دست شما می‌رسد.",
  },
  {
    id: 3,
    question: "چطور می‌توانم سفارش خود را پیگیری کنم؟",
    answer:
      "پس از ثبت سفارش، کد رهگیری برای شما پیامک می‌شود و می‌توانید از طریق بخش 'پیگیری سفارش' در سایت، وضعیت آن را مشاهده کنید.",
  },
  {
    id: 4,
    question: "آیا امکان بازگشت کالا وجود دارد؟",
    answer:
      "بله، تا ۷ روز پس از تحویل سفارش، در صورت عدم استفاده از محصول، امکان بازگشت کالا وجود دارد.",
  },
  {
    id: 5,
    question: "چطور می‌توانم با پشتیبانی تماس بگیرم؟",
    answer: "از طریق شماره ۰۹۳۰۴۱۳۰۲۲۹ با تیم پشتیبانی ما در ارتباط باشید.",
  },
];

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-stone-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 px-4 text-right hover:bg-stone-50 transition-colors duration-200 cursor-pointer"
      >
        <span className="font-sansMed text-stone-800 text-sm">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-stone-500"
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-3 text-stone-600 font-sansMed text-sm leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingFAQ() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-[999] group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-stone-800/20 blur-sm" />

          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-stone-800 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer">
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isOpen ? (
                <HiOutlineX className="text-white text-xl sm:text-2xl" />
              ) : (
                <HiOutlineQuestionMarkCircle className="text-white text-2xl sm:text-3xl" />
              )}
            </motion.div>
          </div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
            className="fixed bottom-28 sm:bottom-24 right-4 sm:right-6 z-[999] w-[calc(100%-2rem)] sm:w-80 md:w-96 max-h-[60vh] sm:max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden"
          >
            <div className="bg-stone-800 px-4 py-3 flex items-center justify-between">
              <h3 className="text-white font-sansBold text-sm sm:text-base">
                سوالات متداول
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-300 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <HiOutlineX size={20} />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(60vh-60px)] sm:max-h-[calc(70vh-60px)]">
              {faqData.map((item) => (
                <FAQItem
                  key={item.id}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default FloatingFAQ;
