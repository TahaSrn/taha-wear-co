import supabase from "./supabase";


export async function getOrCreateCart(userId) {

  let { data: cart, error } = await supabase.
  from("carts").
  select("*").
  eq("user_id", userId).
  maybeSingle();


  if (error && error.code !== "PGRST116") {
    throw new Error(error.message);
  }


  if (!cart) {
    const { data: newCart, error: insertError } = await supabase.
    from("carts").
    insert({ user_id: userId }).
    select().
    single();

    if (insertError) throw new Error(insertError.message);
    cart = newCart;
  }

  return cart;
}


export async function getCartItems(cartId) {
  const { data, error } = await supabase.
  from("cart_items").
  select(
    `
      *,
      products (id, name, price),
      colors (id, name)
    `
  ).
  eq("cart_id", cartId);

  if (error) throw new Error(error.message);
  return data;
}


export async function addToCart(
cartId,
productId,
colorId,
price,
quantity = 1)
{

  const { data: existing } = await supabase.
  from("cart_items").
  select("id, quantity").
  eq("cart_id", cartId).
  eq("product_id", productId).
  eq("color_id", colorId).
  maybeSingle();

  if (existing) {

    const { error } = await supabase.
    from("cart_items").
    update({ quantity: existing.quantity + quantity }).
    eq("id", existing.id);
    if (error) throw new Error(error.message);
  } else {

    const { error } = await supabase.from("cart_items").insert({
      cart_id: cartId,
      product_id: productId,
      color_id: colorId,
      price,
      quantity
    });
    if (error) throw new Error(error.message);
  }
}


export async function removeFromCart(cartId, productId, colorId) {
  const { error } = await supabase.
  from("cart_items").
  delete().
  eq("cart_id", cartId).
  eq("product_id", productId).
  eq("color_id", colorId);

  if (error) throw new Error(error.message);
}


export async function updateQuantity(cartId, productId, colorId, quantity) {
  if (quantity <= 0) {
    return removeFromCart(cartId, productId, colorId);
  }

  const { error } = await supabase.
  from("cart_items").
  update({ quantity }).
  eq("cart_id", cartId).
  eq("product_id", productId).
  eq("color_id", colorId);

  if (error) throw new Error(error.message);
}


export async function clearCart(cartId) {
  const { error } = await supabase.
  from("cart_items").
  delete().
  eq("cart_id", cartId);

  if (error) throw new Error(error.message);
}