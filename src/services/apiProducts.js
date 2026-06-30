import supabase from "./supabase";

export async function getProducts() {
  const { data: products, error } = await supabase.from("products").select(`
      *,
      productImages (*)
    `);

  if (error) {
    throw new Error(error.message);
  }

  return products;
}
