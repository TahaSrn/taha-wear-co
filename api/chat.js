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

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const text = message.trim().toLowerCase();

    // 🧠 1. تشخیص قیمت (مثلاً: 2 میلیون)
    let maxPrice = null;

    const priceMatch = text.match(/(\d+)\s*میلیون/);
    if (priceMatch) {
      maxPrice = Number(priceMatch[1]) * 1000000;
    }

    // 🧠 2. پاک کردن کلمات اضافی
    let keyword = text
      .replace(/زیر|کمتر از|میخوام|می‌خوام|یه|یک|برای/g, "")
      .trim();

    // 🧠 اگر چیزی نموند، کل متن رو بذار
    if (!keyword) keyword = text;

    // 🧠 3. ساخت query
    let query = supabase.from("products").select("*");

    if (keyword) {
      query = query.or(
        `name.ilike.%${keyword}%,description.ilike.%${keyword}%`,
      );
    }

    if (maxPrice) {
      query = query.lte("price", maxPrice);
    }

    const { data, error } = await query.limit(10);

    if (error) {
      console.log("DB ERROR:", error);
      return res.status(500).json({ error: "Database error" });
    }

    // ❌ هیچ نتیجه‌ای نبود
    if (!data || data.length === 0) {
      return res.status(200).json({
        reply: "محصولی پیدا نکردم 😕 یه مدل دیگه امتحان کن",
        products: [],
      });
    }

    // 🧠 4. ساخت جواب فارسی
    const reply =
      `این محصولات رو برات پیدا کردم 👇\n\n` +
      data
        .map((p) => `👕 ${p.name} - ${Number(p.price).toLocaleString()} تومان`)
        .join("\n");

    return res.status(200).json({
      reply,
      products: data,
    });
  } catch (err) {
    console.log("SERVER ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
