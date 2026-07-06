
import supabase from "./supabase";

export async function getCategories() {
  const { data: categories, error: categoriesError } = await supabase.
  from("categories").
  select("id, name, image");

  if (categoriesError) throw new Error(categoriesError.message);

  const { data: products, error: productsError } = await supabase.
  from("products").
  select("categoryId");

  if (productsError) throw new Error(productsError.message);

  const categoriesWithCount = categories.map((category) => ({
    ...category,
    productCount: products.filter(
      (product) => product.categoryId === category.id
    ).length
  }));

  return categoriesWithCount;
}