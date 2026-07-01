import supabase from "./supabase";

export async function getProducts({
  categoryIds,
  colors,
  minPrice,
  maxPrice,
} = {}) {
  let query = supabase.from("products").select(`
      *,
      productImages (*)
    `);

  // فیلتر بر اساس دسته‌بندی
  if (categoryIds && categoryIds.length > 0) {
    query = query.in("categoryId", categoryIds);
  }

  // فیلتر بر اساس قیمت
  if (minPrice) {
    query = query.gte("price", minPrice);
  }
  if (maxPrice) {
    query = query.lte("price", maxPrice);
  }

  // فیلتر بر اساس رنگ
  if (colors && colors.length > 0) {
    const { data: productColors, error: colorError } = await supabase
      .from("product_colors")
      .select("product_id")
      .in("color_id", colors);

    if (colorError) {
      console.error("Error fetching product colors:", colorError);
      return [];
    }

    const productIds = productColors?.map((p) => p.product_id) || [];

    if (productIds.length === 0) {
      return [];
    }

    query = query.in("id", productIds);
  }

  const { data: products, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
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

export async function getMaxPrice() {
  const { data, error } = await supabase.from("products").select("price");

  if (error) {
    console.error("Error fetching prices:", error);
    return 10000000;
  }

  if (!data || data.length === 0) {
    return 10000000;
  }

  const prices = data.map((item) => item.price);
  const maxPrice = Math.max(...prices);

  return maxPrice;
}
