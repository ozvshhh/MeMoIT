import { Router, Request, Response } from "express";
import { openai } from "../../config/openai";

const router = Router();

router.post("/chat", async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // 또는 "gpt-4o"    
      messages: [{ role: "user", content: prompt }],
    });

    // ✅ 안전한 응답 처리
    const message = completion.choices?.[0]?.message?.content;

    if (!message) {
      console.warn("⚠️ OpenAI returned an empty or invalid response");
      return res.status(500).json({ error: "Invalid response from OpenAI" });
    }

    res.json({ reply: message });
  } catch (error) {
    console.error("❌ OpenAI API error:", error);
    res.status(500).json({ error: "OpenAI API error" });
  }
});

export default router;
