import {
  getOrCreateCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCartItems,
} from "../../services/apiCart";

// همگام‌سازی سبد خرید محلی با سرور
export async function syncCartWithServer(userId, localItems) {
  const cart = await getOrCreateCart(userId);

  // ابتدا سبد خرید سرور رو پاک کن
  await clearCart(cart.id);

  // سپس همه آیتم‌های محلی رو به سرور اضافه کن
  for (const item of localItems) {
    await addToCart(cart.id, item.id, item.colorId, item.price, item.quantity);
  }

  return cart.id;
}

// گرفتن سبد خرید از سرور و تبدیل به فرمت محلی
export async function loadCartFromServer(userId) {
  const cart = await getOrCreateCart(userId);
  const items = await getCartItems(cart.id);

  return items.map((item) => ({
    id: item.product_id,
    name: item.products?.name || "",
    price: item.price,
    image: item.products?.image || "",
    colorId: item.color_id,
    colorName: item.colors?.name || "",
    quantity: item.quantity,
    totalPrice: item.price * item.quantity,
  }));
}
