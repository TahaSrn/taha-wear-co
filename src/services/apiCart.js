import supabase from "./supabase";

// ۱. گرفتن یا ساخت Cart برای کاربر
export async function getOrCreateCart(userId) {
  // اول ببین cart وجود داره؟
  let { data: cart, error } = await supabase
    .from("carts")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  // اگه ارور داشت و ارور "not found" نبود، خطا بده
  if (error && error.code !== "PGRST116") {
    throw new Error(error.message);
  }

  // اگر وجود نداشت، بساز
  if (!cart) {
    const { data: newCart, error: insertError } = await supabase
      .from("carts")
      .insert({ user_id: userId })
      .select()
      .single();

    if (insertError) throw new Error(insertError.message);
    cart = newCart;
  }

  return cart;
}

// ۲. گرفتن آیتم‌های سبد خرید
export async function getCartItems(cartId) {
  const { data, error } = await supabase
    .from("cart_items")
    .select(
      `
      *,
      products (id, name, price),
      colors (id, name)
    `,
    )
    .eq("cart_id", cartId);

  if (error) throw new Error(error.message);
  return data;
}

// ۳. افزودن آیتم به سبد خرید
export async function addToCart(
  cartId,
  productId,
  colorId,
  price,
  quantity = 1,
) {
  // چک کن آیا این محصول با این رنگ قبلاً وجود داره؟
  const { data: existing } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cartId)
    .eq("product_id", productId)
    .eq("color_id", colorId)
    .maybeSingle();

  if (existing) {
    // اگر وجود داره، تعداد رو افزایش بده
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: existing.quantity + quantity })
      .eq("id", existing.id);
    if (error) throw new Error(error.message);
  } else {
    // اگر وجود نداره، آیتم جدید بساز
    const { error } = await supabase.from("cart_items").insert({
      cart_id: cartId,
      product_id: productId,
      color_id: colorId,
      price,
      quantity,
    });
    if (error) throw new Error(error.message);
  }
}

// ۴. حذف آیتم از سبد خرید
export async function removeFromCart(cartId, productId, colorId) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cartId)
    .eq("product_id", productId)
    .eq("color_id", colorId);

  if (error) throw new Error(error.message);
}

// ۵. آپدیت تعداد آیتم
export async function updateQuantity(cartId, productId, colorId, quantity) {
  if (quantity <= 0) {
    return removeFromCart(cartId, productId, colorId);
  }

  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("cart_id", cartId)
    .eq("product_id", productId)
    .eq("color_id", colorId);

  if (error) throw new Error(error.message);
}

// ۶. خالی کردن سبد خرید
export async function clearCart(cartId) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cartId);

  if (error) throw new Error(error.message);
}
