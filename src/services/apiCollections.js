import supabase from "./supabase";

export async function getCollections() {
  const { data, error } = await supabase.
  from("collections").
  select("*").
  order("id", { ascending: true });

  if (error) {
    console.error("Error fetching collections:", error);
    throw new Error(error.message);
  }

  return data;
}