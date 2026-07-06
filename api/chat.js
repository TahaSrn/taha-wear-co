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

    const text = message.toLowerCase().trim();

    // 🔥 مهم: فقط اولین کلمه واقعی (برای اینکه همیشه نتیجه بده)
    const words = text.split(" ");
    const keyword = words[0];

    console.log("KEYWORD:", keyword);

    // 🧠 جستجو در اسم و توضیحات
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .or(`name.ilike.%${keyword}%,description.ilike.%${keyword}%`)
      .limit(10);

    if (error) {
      console.log("DB ERROR:", error);
      return res.status(500).json({ error: "Database error" });
    }

    // ❌ هیچ نتیجه‌ای نبود
    if (!data || data.length === 0) {
      return res.status(200).json({
        reply: "چیزی پیدا نکردم 😕",
        products: [],
      });
    }

    // 🟢 ساخت پاسخ ساده و مطمئن
    const reply =
      "این محصولات رو پیدا کردم 👇\n\n" +
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
