🌍 Travel Mode — AI-Powered Food Discovery
Travel Mode is an AI-powered feature that helps users discover authentic local food and top restaurants for any destination city. It delivers clean, structured recommendations that can be consumed directly by a modern frontend.
This project is part of SeasoServe, focusing on smart, location-aware food discovery.
✨ Features
🌆 Discover top restaurants for any city worldwide
🍽️ Explore authentic, must-try local dishes
⚡ Fast, real-time AI recommendations
🧠 Clean JSON responses (frontend-friendly)
🔐 Secure API handling via environment variables
💸 Uses free AI models (Groq)
🛠️ Tech Stack
Frontend
React + TypeScript
Tailwind CSS
Lucide Icons
Backend
Node.js
Express.js
Groq AI (LLaMA 3.1)
node-fetch
dotenv
CORS enabled
📡 API Endpoint
POST /api/travel-food
Request Body
{
  "destination": "Paris"
}
Response
{
  "restaurants": [...],
  "foods": [...]
}
The response always contains valid JSON suitable for direct UI rendering.
🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/your-username/SeasoServe.git
cd SeasoServe/backend/Travel
2️⃣ Install Dependencies
npm install
3️⃣ Create .env File
GROQ_API_KEY=your_groq_api_key_here
⚠️ Never commit your .env file.
4️⃣ Start the Server
node server.cjs
Server will run at:
http://localhost:8080
5️⃣ Test the API
curl -X POST http://localhost:8080/api/travel-food \
  -H "Content-Type: application/json" \
  -d '{"destination":"Paris"}'
🧠 How It Works
User enters a destination city
Frontend sends request to backend
Backend queries Groq AI with a strict JSON prompt
AI returns structured restaurant & food data
Frontend renders results instantly
🔒 Security & Reliability
API keys stored securely using environment variables
Strict JSON parsing prevents malformed responses
Defensive error handling for AI failures
Model deprecation handled gracefully
📈 Future Improvements
Result caching for faster repeat searches
Country-specific food accuracy tuning
Google Maps / Places integration
Backend deployment (Railway / Render)
User preferences & dietary filters