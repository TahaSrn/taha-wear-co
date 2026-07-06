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

    const text = message.toLowerCase().trim();

    // ----------------------------
    // 🧠 1. تشخیص قیمت
    // ----------------------------
    let maxPrice = null;
    const priceMatch = text.match(/(\d+)\s*میلیون/);
    if (priceMatch) {
      maxPrice = Number(priceMatch[1]) * 1_000_000;
    }

    // ----------------------------
    // 🧠 2. تشخیص رنگ
    // ----------------------------
    let color = null;

    if (text.includes("مشکی")) color = "مشکی";
    else if (text.includes("سفید")) color = "سفید";
    else if (text.includes("آبی")) color = "آبی";
    else if (text.includes("قهوه")) color = "قهوه";

    // ----------------------------
    // 🧠 3. تشخیص دسته‌بندی (خیلی مهم)
    // ----------------------------
    let categoryId = null;

    if (text.includes("کت")) categoryId = 2;
    else if (text.includes("شلوار")) categoryId = 4;
    else if (text.includes("دورس")) categoryId = 3;
    else if (text.includes("تی") || text.includes("تیشرت")) categoryId = 1;
    else if (text.includes("کاپشن")) categoryId = 5;
    else if (text.includes("کفش")) categoryId = 6;

    // ----------------------------
    // 🧠 4. ساخت query
    // ----------------------------
    let query = supabase.from("products").select("*");

    if (categoryId) {
      query = query.eq("categoryId", categoryId);
    }

    if (maxPrice) {
      query = query.lte("price", maxPrice);
    }

    const { data, error } = await query.limit(20);

    if (error) {
      console.log("DB ERROR:", error);
      return res.status(500).json({ error: "Database error" });
    }

    // ----------------------------
    // 🧠 5. فیلتر رنگ (بعد از DB)
    // ----------------------------
    let filtered = data;

    if (color) {
      filtered = filtered.filter(
        (p) => p.name.includes(color) || p.description.includes(color),
      );
    }

    // ----------------------------
    // ❌ نتیجه خالی
    // ----------------------------
    if (!filtered || filtered.length === 0) {
      return res.status(200).json({
        reply: "چیزی پیدا نکردم 😕",
        products: [],
      });
    }

    // ----------------------------
    // 🟢 ساخت پاسخ
    // ----------------------------
    return res.status(200).json({
      reply: "این گزینه‌ها رو پیدا کردم 👇",
      products: filtered,
    });
  } catch (err) {
    console.log("SERVER ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
