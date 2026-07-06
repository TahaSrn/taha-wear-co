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

    const text = message.toLowerCase();

    // 🎯 تشخیص ساده ولی فارسی‌محور
    let keyword = "";

    if (text.includes("هودی")) keyword = "هودی";
    else if (text.includes("تیشرت")) keyword = "تیشرت";
    else if (text.includes("شلوار")) keyword = "شلوار";
    else keyword = text; // اگر چیزی نفهمید، کل جمله رو سرچ کن

    // 🔍 سرچ قوی در Supabase
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .or(`name.ilike.%${keyword}%,description.ilike.%${keyword}%`)
      .limit(5);

    if (error) {
      console.error("DB Error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    // ❌ اگر چیزی پیدا نشد
    if (!data || data.length === 0) {
      return res.status(200).json({
        reply: "محصولی پیدا نکردم 😕 یه مدل دیگه امتحان کن",
        products: [],
      });
    }

    // 🧠 ساخت جواب طبیعی
    const reply =
      `این چند محصول برات پیدا کردم 👇\n\n` +
      data
        .map((p) => `👕 ${p.name} - ${p.price.toLocaleString()} تومان`)
        .join("\n");

    return res.status(200).json({
      reply,
      products: data,
    });
  } catch (err) {
    console.error("Server Error:", err);

    return res.status(500).json({
      error: "Server error",
    });
  }
}
