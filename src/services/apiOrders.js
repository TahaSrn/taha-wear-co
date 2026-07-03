import supabase from "./supabase";

export async function createOrder(userId, cartItems, totalPrice) {
  // ۱. ایجاد سفارش جدید
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      total_price: totalPrice,
      status: "pending",
    })
    .select()
    .single();

  if (orderError) throw new Error(orderError.message);

  // ۲. تبدیل آیتم‌های سبد خرید به آیتم‌های سفارش
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    color_id: item.colorId,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw new Error(itemsError.message);

  // ۳. خالی کردن سبد خرید
  const { error: clearError } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cartItems[0]?.cartId);

  if (clearError) throw new Error(clearError.message);

  return order;
}

export async function getUserOrders(userId) {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        *,
        products (id, name, price),
        colors (id, name)
      )
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}
