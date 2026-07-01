import { useSelector, useDispatch } from "react-redux";
import EmptyCart from "../../ui/EmptyCart";
import CartItem from "./CartItem";
import Header from "../../ui/Header";
import { formatCurrency } from "../../utils/helpers";
import Footer from "../../ui/Footer";

function Cart() {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart,
  );

  if (items.length === 0) return <EmptyCart />;

  console.log(items);

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
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
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
            <button className="w-full font-sansMed mt-4 bg-stone-800 text-white py-2.5 md:py-3 rounded-lg hover:bg-stone-700 transition-colors cursor-pointer text-sm md:text-base">
              ثبت سفارش
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
