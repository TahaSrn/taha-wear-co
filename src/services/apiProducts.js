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

export async function getNewestProducts() {
  const categories = [1, 2, 3, 4, 5, 6];

  const results = await Promise.all(
    categories.map(async (category) => {
      const { data, error } = await supabase
        .from("products")
        .select(
          `
      *,
      productImages (image)
    `,
        )
        .eq("categoryId", category)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw new Error(error.message);

      return data;
    }),
  );

  return results.flat();
}
