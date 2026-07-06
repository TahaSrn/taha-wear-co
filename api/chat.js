import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

export default async function handler(req, res) {
  console.log("METHOD:", req.method); // 👈 برای دیباگ

  if (req.method !== "POST") {
    return res.status(200).json({ error: "Only POST allowed" });
  }

  try {
    const { message } = req.body;
    console.log("MESSAGE:", message);

    // 🔥 خیلی ساده: کل جمله رو سرچ کن
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .or(`name.ilike.%${message}%,description.ilike.%${message}%`)
      .limit(5);

    console.log("DATA:", data);

    if (error) {
      console.log(error);
      return res.status(500).json({ error: "DB error" });
    }

    if (!data || data.length === 0) {
      return res.status(200).json({
        reply: "هیچی پیدا نکردم 😕 (باید دیتابیس چک بشه)",
        products: [],
      });
    }

    return res.status(200).json({
      reply: `چند محصول پیدا کردم 👌`,
      products: data,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Server error" });
  }
}
