import supabase from "./supabase";

const sortProductImages = (images) => {
  if (!images || images.length === 0) return images;

  const pImages = images.filter((img) => img.image && img.image.includes("/P"));
  const mImages = images.filter(
    (img) => img.image && !img.image.includes("/P"),
  );

  pImages.sort((a, b) => a.id - b.id);
  mImages.sort((a, b) => a.id - b.id);

  return [...pImages, ...mImages];
};

export async function getProducts({
  categoryIds,
  colors,
  minPrice,
  maxPrice,
  sortBy,
  search,
  page = 1,
  limit = 12,
} = {}) {
  let query = supabase.from("products").select(
    `
      *,
      productImages (*),
      product_colors (
        color_id,
        colors (
          id,
          name
        )
      )
    `,
    { count: "exact" },
  );

  if (search && search.trim()) {
    query = query.ilike("name", `%${search.trim()}%`);
  }

  if (categoryIds && categoryIds.length > 0) {
    query = query.in("categoryId", categoryIds);
  }

  if (minPrice) {
    query = query.gte("price", minPrice);
  }
  if (maxPrice) {
    query = query.lte("price", maxPrice);
  }

  if (colors && colors.length > 0) {
    const { data: productColors } = await supabase
      .from("product_colors")
      .select("product_id")
      .in("color_id", colors);

    const productIds = productColors?.map((p) => p.product_id) || [];

    if (productIds.length === 0) {
      return { products: [], count: 0 };
    }

    query = query.in("id", productIds);
  }

  if (sortBy === "newest") {
    query = query.order("created_at", { ascending: false });
  } else if (sortBy === "price-asc") {
    query = query.order("price", { ascending: true });
  } else if (sortBy === "price-desc") {
    query = query.order("price", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data: products, error, count } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    throw new Error(error.message);
  }

  if (products) {
    products.forEach((product) => {
      if (product.productImages) {
        product.productImages = sortProductImages(product.productImages);
      }
    });
  }

  return { products: products || [], count: count || 0 };
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
      productImages (id, image, productId),
      product_colors (
        color_id,
        colors (
          id,
          name
        )
      )
    `,
        )
        .eq("categoryId", category)
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) throw new Error(error.message);

      if (data) {
        data.forEach((product) => {
          if (product.productImages) {
            product.productImages = sortProductImages(product.productImages);
          }
        });
      }

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

export async function getProduct(productId) {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      productImages (*),
      product_colors (
        color_id,
        colors (
          id,
          name
        )
      ),
      categories (
        id,
        name
      )
    `,
    )
    .eq("id", productId)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    throw new Error(error.message);
  }

  if (data && data.productImages) {
    data.productImages = sortProductImages(data.productImages);
  }

  return data;
}
