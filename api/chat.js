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

    // 🧠 1. تشخیص قیمت (مثلاً: 3 میلیون)
    let maxPrice = null;
    const priceMatch = text.match(/(\d+)\s*میلیون/);
    if (priceMatch) {
      maxPrice = Number(priceMatch[1]) * 1000000;
    }

    // 🧠 2. تشخیص رنگ
    let color = null;

    if (text.includes("مشکی")) color = "مشکی";
    if (text.includes("سفید")) color = "سفید";
    if (text.includes("آبی")) color = "آبی";
    if (text.includes("قهوه")) color = "قهوه‌ای";

    // 🧠 3. تشخیص نوع محصول
    let keyword = null;

    if (text.includes("کت")) keyword = "کت";
    else if (text.includes("شلوار")) keyword = "شلوار";
    else if (text.includes("دورس")) keyword = "دورس";
    else if (text.includes("تی شرت") || text.includes("تیشرت")) keyword = "تی";

    // 🧠 4. ساخت query
    let query = supabase.from("products").select("*");

    if (keyword) {
      query = query.ilike("name", `%${keyword}%`);
    }

    if (maxPrice) {
      query = query.lte("price", maxPrice);
    }

    const { data, error } = await query.limit(20);

    if (error) {
      return res.status(500).json({ error: "DB error" });
    }

    // 🧠 5. فیلتر رنگ در JS (چون دیتابیس نداریش)
    let filtered = data;

    if (color) {
      filtered = filtered.filter(
        (p) => p.name.includes(color) || p.description.includes(color),
      );
    }

    // ❌ نتیجه خالی
    if (!filtered.length) {
      return res.json({
        reply: "چیزی پیدا نکردم 😕",
        products: [],
      });
    }

    // 🟢 پاسخ
    return res.json({
      reply: "این گزینه‌ها رو پیدا کردم 👇",
      products: filtered,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
}
