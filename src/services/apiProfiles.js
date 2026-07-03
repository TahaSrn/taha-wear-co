// src/services/apiProfiles.js
import supabase from "./supabase";

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error(error.message);
  }

  return data;
}

export async function createProfile(userId, name = "") {
  const { data, error } = await supabase
    .from("profiles")
    .insert({ user_id: userId, name })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateProfile(userId, updates) {
  // اول چک کن پروفایل وجود داره یا نه
  const existing = await getProfile(userId);

  if (!existing) {
    // اگه وجود نداره، بسازش
    return createProfile(userId, updates.name || "");
  }

  // اگه وجود داره، آپدیتش کن
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("user_id", userId)
    .select();

  if (error) throw new Error(error.message);

  // data[0] رو برگردون (به جای .single())
  return data?.[0] || null;
}
