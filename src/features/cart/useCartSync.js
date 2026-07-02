import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../authentication/useAuth";
import { loadCartFromServer, syncCartWithServer } from "./cartService";
import { loadCart, clearCart } from "./cartSlice";

export function useCartSync() {
  const dispatch = useDispatch();
  const { user, loading } = useAuth();
  const localItems = useSelector((state) => state.cart.items);

  // وقتی کاربر لاگین میکنه، سبد خرید رو از سرور بارگذاری کن
  useEffect(() => {
    if (loading) return;

    const syncCart = async () => {
      if (user) {
        try {
          // سبد خرید محلی رو با سرور همگام‌سازی کن
          const serverItems = await loadCartFromServer(user.id);

          if (serverItems.length > 0) {
            // اگر سبد خرید سرور خالی نبود، اون رو بارگذاری کن
            dispatch(loadCart(serverItems));
          } else if (localItems.length > 0) {
            // اگر سبد خرید محلی پر بود، اون رو به سرور بفرست
            await syncCartWithServer(user.id, localItems);
          }
        } catch (error) {
          console.error("Error syncing cart:", error);
        }
      } else {
        // کاربر خارج شده، سبد خرید رو پاک نکن (همون localStorage کار میکنه)
        // فقط دیگه با سرور همگام‌سازی نمیشه
      }
    };

    syncCart();
  }, [user, loading, dispatch]);
}
