import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIRecipeChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your AI recipe assistant. Ask me about seasonal recipes, cooking tips, or ingredient suggestions!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = async (userMessage: string): Promise<string> => {
    // Placeholder AI responses - replace with actual LLM integration
    const responses = [
      "That's a great question about seasonal cooking! Let me suggest some fresh ingredients for this time of year.",
      "I'd recommend trying a recipe with seasonal vegetables. They're at their peak flavor right now!",
      "Here's a cooking tip: always taste as you go and adjust seasonings accordingly.",
      "For that ingredient, I suggest pairing it with complementary flavors like herbs and citrus.",
      "That sounds delicious! Have you considered adding some seasonal spices to enhance the flavor?",
    ];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Get AI response
    const aiResponse = await getAIResponse(input);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      isUser: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, aiMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto h-96 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Recipe Assistant</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4 pt-0">
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.isUser
                    ? "bg-primary text-primary-foreground ml-4"
                    : "bg-muted mr-4"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about recipes..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecipeChatbot;