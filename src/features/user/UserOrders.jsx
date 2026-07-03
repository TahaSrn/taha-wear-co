import { formatCurrency } from "../../utils/helpers";

function UserOrders({ orders }) {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8 text-center">
        <p className="text-stone-500 font-sansMed">هنوز سفارشی ثبت نکردید</p>
        <p className="text-sm text-stone-400 font-sansMed mt-1">
          اولین سفارش خود را از فروشگاه ثبت کنید
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-stone-500 font-sansMed">
                شماره سفارش: #{order.id}
              </p>
              <p className="text-xs text-stone-400 font-sansMed">
                {new Date(order.created_at).toLocaleDateString("fa-IR")}
              </p>
            </div>
            <div className="text-left">
              <p className="font-sansBold text-stone-800">
                {formatCurrency(order.total_price)} تومان
              </p>
              <span className="inline-block px-3 py-0.5 rounded-full text-xs font-sansMed bg-stone-100 text-stone-600">
                {order.status === "pending" ? "در انتظار تایید" : order.status}
              </span>
            </div>
          </div>

          <div className="border-t border-stone-100 pt-4 space-y-2">
            {order.order_items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="font-sansMed text-stone-700">
                    {item.products?.name || "محصول"}
                  </span>
                  {item.colors?.name && (
                    <span className="text-xs text-stone-400">
                      رنگ: {item.colors.name}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-stone-500">×{item.quantity}</span>
                  <span className="font-sansMed text-stone-700">
                    {formatCurrency(item.price)} تومان
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserOrders;
