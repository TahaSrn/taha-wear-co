import {
  getOrCreateCart,
  addToCart,
  clearCart,
  getCartItems,
} from "../../services/apiCart";

export async function syncCartWithServer(userId, localItems) {
  const cart = await getOrCreateCart(userId);

  await clearCart(cart.id);

  for (const item of localItems) {
    await addToCart(cart.id, item.id, item.colorId, item.price, item.quantity);
  }

  return cart.id;
}

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
