import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const text = message.toLowerCase();

    // فقط کلمه‌های مهم
    const keyword = text
      .replace(/زیر|کمتر|میخوام|می‌خوام|یه|یک|برای|تومان|\d+|میلیون/g, "")
      .trim();

    console.log("KEYWORD:", keyword);

    // ❗ مهم: بدون OR (پایدارترین حالت)
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("name", `%${keyword}%`)
      .limit(10);

    if (error) {
      console.log("DB ERROR:", error);
      return res.status(500).json({ error: "Database error" });
    }

    // اگر با name چیزی پیدا نشد → روی description تست کن
    if (!data || data.length === 0) {
      const fallback = await supabase
        .from("products")
        .select("*")
        .ilike("description", `%${keyword}%`)
        .limit(10);

      if (!fallback.data || fallback.data.length === 0) {
        return res.json({
          reply: "چیزی پیدا نکردم 😕",
          products: [],
        });
      }

      return res.json({
        reply: "این محصولات رو پیدا کردم 👇",
        products: fallback.data,
      });
    }

    return res.json({
      reply: "این محصولات رو پیدا کردم 👇",
      products: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
}
