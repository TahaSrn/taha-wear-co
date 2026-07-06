import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

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

    // 🧠 STEP 1: فهم جمله با AI
    const prompt = `
تو یک سیستم تحلیل سفارش لباس هستی.
این پیام کاربر را تبدیل به JSON کن:

قوانین:
- فقط JSON بده
- هیچ متن اضافه نده
- اگر نبود null بگذار

ساختار:
{
  "category": "کت | شلوار | دورس | تی شرت | کاپشن | کفش | null",
  "color": "مشکی | سفید | آبی | قهوه‌ای | null",
  "maxPrice": عدد یا null
}

پیام:
${message}
`;

    const aiRes = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    let jsonText = aiRes.text;

    // پاکسازی احتمالی متن
    jsonText = jsonText.replace(/```json|```/g, "").trim();

    let filters;
    try {
      filters = JSON.parse(jsonText);
    } catch (e) {
      console.log("PARSE ERROR:", jsonText);
      return res.status(500).json({ error: "AI parse failed" });
    }

    console.log("FILTERS:", filters);

    // 🧠 STEP 2: ساخت query
    let query = supabase.from("products").select("*");

    if (filters.category) {
      const map = {
        کت: 2,
        شلوار: 4,
        دورس: 3,
        "تی شرت": 1,
        کاپشن: 5,
        کفش: 6,
      };

      const catId = map[filters.category];
      if (catId) {
        query = query.eq("categoryId", catId);
      }
    }

    if (filters.maxPrice) {
      query = query.lte("price", filters.maxPrice);
    }

    const { data, error } = await query.limit(20);

    if (error) {
      return res.status(500).json({ error: "DB error" });
    }

    // 🧠 STEP 3: رنگ (ساده فیلتر JS)
    let filtered = data;

    if (filters.color) {
      filtered = filtered.filter(
        (p) =>
          p.name.includes(filters.color) ||
          p.description.includes(filters.color),
      );
    }

    // ❌ نتیجه خالی
    if (!filtered.length) {
      return res.json({
        reply: "چیزی پیدا نکردم 😕",
        products: [],
      });
    }

    // 🟢 پاسخ نهایی
    return res.json({
      reply: "این گزینه‌ها رو بر اساس درخواستت پیدا کردم 👇",
      filters,
      products: filtered,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
}
