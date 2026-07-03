// src/features/user/UserOrders.jsx
import { useState, useEffect } from "react";
import { formatCurrency } from "../../utils/helpers";
import { HiOutlineClock, HiOutlineCheckCircle } from "react-icons/hi";

function UserOrders({ orders }) {
  const [orderStatuses, setOrderStatuses] = useState(() => {
    const saved = localStorage.getItem("orderStatuses");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });

  useEffect(() => {
    orders.forEach((order) => {
      if (
        order.status === "pending" &&
        !orderStatuses[order.id] &&
        !localStorage.getItem(`order_${order.id}_confirmed`)
      ) {
        const timer = setTimeout(() => {
          setOrderStatuses((prev) => {
            const newStatuses = { ...prev, [order.id]: "confirmed" };
            localStorage.setItem("orderStatuses", JSON.stringify(newStatuses));
            localStorage.setItem(`order_${order.id}_confirmed`, "true");
            return newStatuses;
          });
        }, 5000);

        return () => clearTimeout(timer);
      }
    });
  }, [orders, orderStatuses]);

  const getStatusDisplay = (order) => {
    const isConfirmed =
      localStorage.getItem(`order_${order.id}_confirmed`) === "true";
    const status = isConfirmed
      ? "confirmed"
      : orderStatuses[order.id] || order.status;

    if (status === "pending") {
      return {
        label: "در انتظار تایید",
        bgColor: "bg-amber-100",
        textColor: "text-amber-700",
        icon: HiOutlineClock,
        iconColor: "text-amber-500",
      };
    }

    return {
      label: "تایید شده",
      bgColor: "bg-green-100",
      textColor: "text-green-700",
      icon: HiOutlineCheckCircle,
      iconColor: "text-green-500",
    };
  };

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
      {orders.map((order) => {
        const statusInfo = getStatusDisplay(order);
        const StatusIcon = statusInfo.icon;

        return (
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
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-sansMed ${statusInfo.bgColor} ${statusInfo.textColor} transition-all duration-300`}
                >
                  <StatusIcon className={`${statusInfo.iconColor} text-sm`} />
                  {statusInfo.label}
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
                      <span className="text-xs font-sansMed text-stone-400">
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
        );
      })}
    </div>
  );
}

export default UserOrders;
