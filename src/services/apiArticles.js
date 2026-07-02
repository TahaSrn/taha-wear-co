import supabase from "./supabase";

export async function getArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    console.error("Error fetching articles:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function getArticleBySlug(slug) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching article:", error);
    throw new Error(error.message);
  }

  return data;
}
