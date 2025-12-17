const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch"); // IMPORTANT: node-fetch@2

dotenv.config();

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Server running 🚀 (Groq)" });
});

// Travel Food API
app.post("/api/travel-food", async (req, res) => {
  const { destination } = req.body;

  if (!destination) {
    return res.status(400).json({ error: "Destination is required" });
  }

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant", // ✅ ACTIVE FREE MODEL
          temperature: 0.4,
          messages: [
            {
              role: "system",
              content:
                "You are a strict JSON generator. Output ONLY valid JSON. No explanations."
            },
            {
              role: "user",
              content: `For ${destination}, provide top restaurants and authentic foods.

Return ONLY valid JSON in this exact format:

{
  "restaurants": [
    {
      "name": "Restaurant Name",
      "cuisine": "Type",
      "rating": 4.5,
      "price": "$$",
      "address": "Address",
      "description": "One sentence",
      "open": true,
      "emoji": "🍽️"
    }
  ],
  "foods": [
    {
      "name": "Food",
      "description": "Description",
      "emoji": "🍕",
      "mustTry": true
    }
  ]
}

Provide 8-10 restaurants and 6 foods.`
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("🧠 RAW GROQ RESPONSE:");
    console.dir(data, { depth: null });

    const rawText = data?.choices?.[0]?.message?.content;

    if (!rawText) {
      return res.status(500).json({
        error: "Groq returned no text",
        raw: data
      });
    }

    // Extract JSON safely
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return res.status(500).json({
        error: "No JSON found in model response",
        rawText
      });
    }

    const parsed = JSON.parse(jsonMatch[0]);

    res.json(parsed);

  } catch (err) {
    console.error("🔥 SERVER ERROR:", err);
    res.status(500).json({
      error: "Failed to fetch travel data",
      details: err.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
