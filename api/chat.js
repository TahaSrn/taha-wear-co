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

    const text = message.trim();

    // 🧠 استفاده از SQL function که ساختی
    const { data, error } = await supabase.rpc("search_products", {
      search_text: text,
    });

    if (error) {
      console.log("SUPABASE ERROR:", error);
      return res.status(500).json({ error: "Database error" });
    }

    // ❌ اگر چیزی پیدا نشد
    if (!data || data.length === 0) {
      return res.status(200).json({
        reply: "محصولی پیدا نکردم 😕 یه چیز دیگه امتحان کن",
        products: [],
      });
    }

    // 🧠 ساخت پاسخ فارسی
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
