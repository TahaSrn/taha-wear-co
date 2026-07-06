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

    // 🧠 فقط کلمات مهم (بدون عدد و کلمات اضافی)
    const keyword = text
      .replace(/زیر|کمتر|میخوام|می‌خوام|یه|یک|برای|تومان|\d+|میلیون/g, "")
      .trim();

    console.log("KEYWORD:", keyword);

    // 🧠 سرچ مستقیم روی اسم + توضیحات
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .or(`name.ilike.%${keyword}%,description.ilike.%${keyword}%`)
      .limit(10);

    if (error) {
      console.log("DB ERROR:", error);
      return res.status(500).json({ error: "Database error" });
    }

    if (!data || data.length === 0) {
      return res.json({
        reply: "چیزی پیدا نکردم 😕",
        products: [],
      });
    }

    return res.json({
      reply: `این محصولات رو پیدا کردم 👇`,
      products: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
}
