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

    // استخراج keyword ساده
    let keyword = "";

    if (text.includes("هودی")) keyword = "hoodie";
    else if (text.includes("تیشرت")) keyword = "tshirt";
    else if (text.includes("شلوار")) keyword = "pants";
    else keyword = "shirt";

    // سرچ در Supabase
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("name", `%${keyword}%`)
      .limit(5);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "DB error" });
    }

    if (!data || data.length === 0) {
      return res.status(200).json({
        reply: "محصولی پیدا نکردم 😕 یه چیز دیگه امتحان کن",
      });
    }

    const reply =
      "این چند محصول برات پیدا کردم 👇\n\n" +
      data.map((p) => `👕 ${p.name} - ${p.price} تومان`).join("\n");

    return res.status(200).json({ reply, products: data });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Server error",
    });
  }
}
