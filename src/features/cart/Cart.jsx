import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import EmptyCart from "../../ui/EmptyCart";
import CartItem from "./CartItem";
import Header from "../../ui/Header";
import { formatCurrency } from "../../utils/helpers";
import Footer from "../../ui/Footer";
import { useAuth } from "../authentication/useAuth";
import { useProfile } from "../user/useProfile";
import toast from "react-hot-toast";
import { clearCart } from "./cartSlice";
import MobileTabs from "../../ui/MobileTabs";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useProfile(user?.id);
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  if (items.length === 0) return <EmptyCart />;

  const handleCheckout = async () => {
    if (isSubmitting) return;

    if (!user) {
      navigate("/login", { state: { from: { pathname: "/cart" } } });
      return;
    }

    if (!profile?.name || !profile?.phone || !profile?.address) {
      toast.error("لطفاً ابتدا اطلاعات خود را تکمیل کنید");
      navigate("/user");
      return;
    }

    setIsSubmitting(true);

    try {
      toast.success("سفارش شما با موفقیت ثبت شد!");

      dispatch(clearCart());

      navigate("/user");
    } catch (error) {
      toast.error("خطا در ثبت سفارش. لطفاً دوباره تلاش کنید.");
      console.error("Order error:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-caffee-50">
      <Header />
      <div className="pt-15 flex-1 flex flex-col">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 px-3 md:px-8 max-w-7xl mx-auto w-full">
          <div className="flex-1">
            <div className="hidden md:grid grid-cols-12 gap-2 font-sansMed border-b-2 pb-4 border-gray-300/50 text-sm lg:text-base">
              <span className="col-span-1 text-center">حذف</span>
              <span className="col-span-2">عکس</span>
              <span className="col-span-3 pr-4 text-right">محصول</span>
              <span className="col-span-2 text-center">قیمت</span>
              <span className="col-span-2 text-center">تعداد</span>
              <span className="col-span-2 text-left">جمع جزء</span>
            </div>

            <div className="mt-4 space-y-4 pb-10">
              {items.map((item, index) => (
                <CartItem
                  key={`${item.id}-${item.colorId}-${item.sizeId || "no-size"}-${index}`}
                  item={item}
                />
              ))}
            </div>
          </div>

          <div className="w-full md:w-72 lg:w-80 bg-white rounded-xl shadow-md p-4 md:p-6 h-fit sticky top-20">
            <h3 className="text-lg md:text-xl font-sansBold text-stone-800 border-b pb-3">
              خلاصه سفارش
            </h3>
            <div className="space-y-2 md:space-y-3 mt-4">
              <div className="flex justify-between text-sm md:text-base">
                <span className="text-stone-600 font-sansMed">
                  تعداد محصولات
                </span>
                <span className="font-sansBold">{totalQuantity}</span>
              </div>
              <div className="flex justify-between text-sm md:text-base">
                <span className="text-stone-600 font-sansMed">جمع کل</span>
                <span className="font-sansBold">
                  {formatCurrency(totalPrice)} تومان
                </span>
              </div>
              <div className="flex justify-between text-sm md:text-base">
                <span className="text-stone-600 font-sansMed">هزینه ارسال</span>
                <span className="text-green-600 font-sansBold">رایگان</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-base md:text-lg">
                  <span className="font-sansBold">قابل پرداخت</span>
                  <span className="font-sansBold text-stone-800">
                    {formatCurrency(totalPrice)} تومان
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className={`w-full font-sansMed mt-4 py-2.5 md:py-3 rounded-lg transition-colors cursor-pointer text-sm md:text-base ${
                isSubmitting
                  ? "bg-stone-400 cursor-not-allowed text-white"
                  : "bg-stone-800 hover:bg-stone-700 text-white"
              }`}
            >
              {isSubmitting
                ? "در حال ثبت..."
                : !user
                  ? "ورود برای ثبت سفارش"
                  : "ثبت سفارش"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <MobileTabs />
    </div>
  );
}

export default Cart;
