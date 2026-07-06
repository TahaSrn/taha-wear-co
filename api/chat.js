import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { message } = req.body;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
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
    });

    return res.status(200).json({
      reply: response.text,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Gemini request failed",
    });
  }
}
