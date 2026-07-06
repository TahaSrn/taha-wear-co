
import supabase from "./supabase";

export async function getProfile(userId) {
  const { data, error } = await supabase.
  from("profiles").
  select("*").
  eq("user_id", userId).
  single();

  if (error && error.code !== "PGRST116") {
    throw new Error(error.message);
  }

  return data;
}

export async function createProfile(userId, name = "") {
  const { data, error } = await supabase.
  from("profiles").
  insert({ user_id: userId, name }).
  select().
  single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateProfile(userId, updates) {

  const existing = await getProfile(userId);

  if (!existing) {

    return createProfile(userId, updates.name || "");
  }


  const { data, error } = await supabase.
  from("profiles").
  update(updates).
  eq("user_id", userId).
  select();

  if (error) throw new Error(error.message);


  return data?.[0] || null;
}