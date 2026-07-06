import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

// 🧠 امن‌سازی JSON خروجی Gemini
function extractJson(text = "") {
  try {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // 🧠 STEP 1: تبدیل جمله به فیلتر ساختاریافته
    const prompt = `
تو یک سیستم هوشمند فروش لباس هستی.

فقط و فقط JSON خروجی بده. هیچ متن اضافه‌ای نده.

ساختار:
{
  "category": "کت | شلوار | دورس | تی شرت | کاپشن | کفش | null",
  "color": "مشکی | سفید | آبی | قهوه‌ای | null",
  "maxPrice": number | null
}

پیام کاربر:
${message}
`;

    const aiResult = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const rawText = aiResult.text || "";

    const filters = extractJson(rawText);

    if (!filters) {
      return res.json({
        error: "AI parse failed",
        raw: rawText,
      });
    }

    // 🗄️ STEP 2: query اولیه
    let query = supabase.from("products").select("*");

    // category mapping
    if (filters.category) {
      const map = {
        کت: 2,
        شلوار: 4,
        دورس: 3,
        "تی شرت": 1,
        تی: 1,
        کاپشن: 5,
        کفش: 6,
      };

      const catId = map[filters.category];

      if (catId) {
        query = query.eq("categoryId", catId);
      }
    }

    // قیمت
    if (filters.maxPrice) {
      query = query.lte("price", filters.maxPrice);
    }

    const { data, error } = await query.limit(20);

    if (error) {
      return res.status(500).json({
        error: "Database error",
        detail: error,
      });
    }

    // 🎨 فیلتر رنگ (بعد از DB)
    let results = data || [];

    if (filters.color) {
      results = results.filter(
        (p) =>
          (p.name || "").includes(filters.color) ||
          (p.description || "").includes(filters.color),
      );
    }

    // ❌ نتیجه خالی
    if (!results.length) {
      return res.json({
        reply: "چیزی پیدا نکردم 😕",
        filters,
        products: [],
      });
    }

    // 🟢 خروجی نهایی
    return res.json({
      reply: "این گزینه‌ها رو بر اساس درخواستت پیدا کردم 👇",
      filters,
      products: results,
    });
  } catch (err) {
    console.log("SERVER ERROR:", err);

    return res.status(500).json({
      error: "Server error",
      detail: err.message,
    });
  }
}
