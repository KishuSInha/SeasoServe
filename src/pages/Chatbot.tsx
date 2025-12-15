import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Recipe Database
const RECIPE_DATABASE: { [key: string]: any } = {
  "oatmeal": {
    name: "Healthy Oatmeal Bowl",
    ingredients: ["1 cup rolled oats", "2 cups water/milk", "1 banana", "1 tbsp honey", "Pinch of salt"],
    steps: ["Boil water/milk in a pot", "Add oats and salt, cook 5 mins", "Stir occasionally", "Top with banana and honey", "Serve hot"]
  },
  "smoothie": {
    name: "Green Smoothie",
    ingredients: ["1 banana", "1 cup spinach", "1/2 avocado", "1 cup coconut water", "1 tbsp chia seeds"],
    steps: ["Add all ingredients to blender", "Blend until smooth", "Add ice if desired", "Pour into glass", "Enjoy fresh"]
  },
  "salad": {
    name: "Fresh Garden Salad",
    ingredients: ["2 cups mixed greens", "1 cucumber", "1 tomato", "1/4 red onion", "2 tbsp olive oil", "1 tbsp lemon juice"],
    steps: ["Wash and chop vegetables", "Mix greens in bowl", "Add chopped vegetables", "Whisk oil and lemon", "Dress salad and toss"]
  },
  "soup": {
    name: "Vegetable Soup",
    ingredients: ["2 cups mixed vegetables", "4 cups vegetable broth", "1 onion", "2 garlic cloves", "Salt and pepper"],
    steps: ["Sauté onion and garlic", "Add vegetables and cook 5 mins", "Pour in broth", "Simmer 15-20 mins", "Season and serve"]
  }
};

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your cooking assistant. Ask me for any recipe or cooking tips! 👨‍🍳",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRecipe = (query: string) => {
    const lowerQuery = query.toLowerCase();
    for (const [key, recipe] of Object.entries(RECIPE_DATABASE)) {
      if (lowerQuery.includes(key)) {
        return `**${recipe.name}**\n\n**Ingredients:**\n${recipe.ingredients.map((ing: string) => `• ${ing}`).join('\n')}\n\n**Steps:**\n${recipe.steps.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n')}\n\n*Cooking time: 10-20 minutes* ⏰`;
      }
    }

    if (lowerQuery.includes('recipe') || lowerQuery.includes('cook') || lowerQuery.includes('make')) {
      return "I can help you with recipes for:\n• Oatmeal Bowl 🥣\n• Green Smoothie 🥤\n• Fresh Salad 🥗\n• Vegetable Soup 🍲\n\nJust ask me 'How to make [dish name]' or 'Recipe for [dish name]'!";
    }

    return "I'm here to help with recipes and cooking! Try asking:\n• 'How to make oatmeal?'\n• 'Recipe for smoothie'\n• 'Cooking tips for beginners'\n• 'Healthy breakfast ideas'";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getRecipe(input),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <header className="bg-white/80 backdrop-blur-md border-b border-border py-3 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 flex items-center gap-3">
          <Button onClick={() => navigate("/dashboard")} variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Recipe Assistant</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-4xl h-[calc(100vh-140px)] flex flex-col">
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
              <Card className={`max-w-[80%] ${message.isBot ? 'bg-white' : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'}`}>
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    {message.isBot && (
                      <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isBot ? 'text-muted-foreground' : 'text-orange-100'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {!message.isBot && (
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <Card className="bg-white">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-border py-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask for a recipe... (e.g., 'How to make oatmeal?')"
              className="flex-1"
            />
            <Button onClick={handleSend} className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;