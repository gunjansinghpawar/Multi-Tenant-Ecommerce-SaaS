"use client";

import React, { useState } from "react";
import { 
  PageHeader, 
  Card, 
  CardContent,
  Button
} from "@commercex/ui";
import { SparklesIcon, SendIcon, BotIcon, UserIcon } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIThemeAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi there! I'm your AI Theme Assistant. I can help you write custom CSS, suggest layout changes, or recommend color palettes for your store. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: `Here is a suggestion based on your request:\n\n\`\`\`css\n/* Custom CSS for your request */\n.your-element {\n  background-color: #f3f4f6;\n  border-radius: 8px;\n  padding: 16px;\n}\n\`\`\`\n\nYou can apply this in your Theme Settings under "Custom CSS".`
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 h-[calc(100vh-120px)] flex flex-col">
      <PageHeader 
        heading="AI Theme Assistant" 
        text="Chat with AI to get custom CSS, layout suggestions, and design tips."
      />
      
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <BotIcon className="h-4 w-4 text-primary" />
                  </div>
                )}
                
                <div className={`max-w-[80%] rounded-lg p-4 text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <div className="whitespace-pre-wrap font-sans leading-relaxed">
                    {msg.content}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <UserIcon className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-4 justify-start">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <BotIcon className="h-4 w-4 text-primary" />
                </div>
                <div className="max-w-[80%] rounded-lg p-4 bg-muted flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-card">
            <form onSubmit={handleSend} className="relative">
              <input 
                type="text" 
                placeholder="Ask for custom CSS to round button corners..." 
                className="w-full pl-4 pr-12 py-3 rounded-md border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary shadow-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
              />
              <Button 
                type="submit" 
                size="icon" 
                className="absolute right-1 top-1 bottom-1 h-auto"
                disabled={!input.trim() || isTyping}
              >
                <SendIcon className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
