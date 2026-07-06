export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `
تو یک دستیار فروشگاه لباس هستی.
فقط فارسی جواب بده.
مختصر، دوستانه و کاربردی باش.

کاربر گفته:
${message}
                  `,
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    // اگر خطا از Gemini اومد
    if (!response.ok) {
      console.error("GEMINI ERROR:", data);
      return res.status(500).json({
        error: "Gemini API Error",
        detail: data,
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "پاسخی دریافت نشد";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("SERVER ERROR:", err);

    return res.status(500).json({
      error: "Server error",
    });
  }
}
