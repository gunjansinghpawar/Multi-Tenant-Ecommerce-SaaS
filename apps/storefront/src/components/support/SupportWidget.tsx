'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, Phone, MessageSquare } from 'lucide-react';

export function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'menu' | 'chat'>('menu');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋 How can we help you today?", isBot: true }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const newMsg = { id: Date.now(), text: message, isBot: false };
    setMessages([...messages, newMsg]);
    setMessage('');

    // Simulate bot reply
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "Thanks for reaching out! A support agent will be with you shortly. In the meantime, have you checked our Help Center?", 
        isBot: true 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Widget Popover */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col transition-all duration-300 animate-in slide-in-from-bottom-4">
          
          {/* Header */}
          <div className="bg-black dark:bg-gray-800 p-4 text-white flex items-center justify-between">
            <div className="flex items-center">
              {mode === 'chat' && (
                <button onClick={() => setMode('menu')} className="mr-3 hover:bg-white/20 p-1 rounded-full transition-colors">
                  <X className="w-4 h-4 rotate-45" /> {/* Close-like back button */}
                </button>
              )}
              <div>
                <h3 className="font-bold text-sm">{mode === 'menu' ? 'Support Hub' : 'Live Chat'}</h3>
                <p className="text-xs text-gray-300">{mode === 'menu' ? 'We usually reply in minutes' : 'Agent typing...'}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Mode */}
          {mode === 'menu' && (
            <div className="p-4 space-y-3">
              <button 
                onClick={() => setMode('chat')}
                className="w-full flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
              >
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mr-4">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block font-bold text-gray-900 dark:text-white text-sm">Start a conversation</span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">Live chat with our team</span>
                </div>
              </button>

              <button className="w-full flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mr-4">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block font-bold text-gray-900 dark:text-white text-sm">WhatsApp</span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">Message us securely</span>
                </div>
              </button>

              <button className="w-full flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mr-4">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block font-bold text-gray-900 dark:text-white text-sm">Request a callback</span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">We'll call you in ~5 mins</span>
                </div>
              </button>
            </div>
          )}

          {/* Chat Mode */}
          {mode === 'chat' && (
            <>
              <div className="h-80 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.isBot 
                        ? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-tl-sm' 
                        : 'bg-black dark:bg-white text-white dark:text-black rounded-tr-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                <form onSubmit={handleSend} className="flex items-center">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                  <button 
                    type="submit" 
                    disabled={!message.trim()}
                    className="ml-2 w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center disabled:opacity-50 transition-colors"
                  >
                    <Send className="w-4 h-4 ml-1" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}

      {/* FAB Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-200"
        aria-label="Toggle Support Widget"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
