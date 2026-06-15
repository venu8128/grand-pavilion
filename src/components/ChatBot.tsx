"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Utensils, Calendar, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
  options?: string[];
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "Greetings! Welcome to KOWSHIK. I am your virtual culinary concierge. How may I assist you today?",
      timestamp: new Date(),
      options: ["View Opening Hours", "Find Our Location", "Chef recommendations", "Reserve a Table"]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      sender: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Generate bot response
    setTimeout(() => {
      const response = generateBotResponse(text);
      setMessages(prev => [...prev, response]);
    }, 800);
  };

  const handleOptionClick = (option: string) => {
    handleSend(option);
  };

  const generateBotResponse = (input: string): Message => {
    const text = input.toLowerCase();
    const timestamp = new Date();

    if (text.includes('hour') || text.includes('time') || text.includes('open')) {
      return {
        sender: 'bot',
        text: "We are delighted to serve you daily from 09:00 AM to 10:00 PM. Our kitchen accepts the final orders up to 09:30 PM.",
        timestamp,
        options: ["Reserve a Table", "View Menu"]
      };
    }

    if (text.includes('location') || text.includes('where') || text.includes('address') || text.includes('vijayawada') || text.includes('poranki')) {
      return {
        sender: 'bot',
        text: "KOWSHIK is situated in Poranki, Vijayawada, Andhra Pradesh, India. We feature spacious parking and valet services for our guests.",
        timestamp,
        options: ["View Opening Hours", "Reserve a Table"]
      };
    }

    if (text.includes('recommend') || text.includes('dish') || text.includes('food') || text.includes('menu') || text.includes('special') || text.includes('eat')) {
      return {
        sender: 'bot',
        text: "Chef Raghavan Iyer recommends starting with our Truffle Wild Mushroom Galouti, followed by our signature 24-Hour simmered Dal Suprabath and Saffron Butter Lobster Tail. For dessert, do not miss the Cardamom Mango Kulfi.",
        timestamp,
        options: ["Reserve a Table", "Order Online"]
      };
    }

    if (text.includes('reserve') || text.includes('book') || text.includes('table') || text.includes('seat')) {
      return {
        sender: 'bot',
        text: "To book a table instantly, you can use our online reservation system on the website page (just scroll down to the 'Book a Table' section). Alternatively, call our reservation desk directly at +91 9177173416.",
        timestamp,
        options: ["View Opening Hours", "Find Our Location"]
      };
    }

    if (text.includes('order') || text.includes('cart') || text.includes('buy') || text.includes('delivery')) {
      return {
        sender: 'bot',
        text: "We provide secure home delivery in custom thermo-regulated packaging to preserve flavor. Simply click 'Add to Order' on any item in our Interactive Menu section above, and complete checkout.",
        timestamp,
        options: ["View Menu", "Reserve a Table"]
      };
    }

    if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('greetings')) {
      return {
        sender: 'bot',
        text: "Hello! How can I assist you with your dining experience today? I can help with reservations, location, hours, or menu choices.",
        timestamp,
        options: ["View Opening Hours", "Chef recommendations", "Reserve a Table"]
      };
    }

    return {
      sender: 'bot',
      text: "I want to make sure I assist you correctly. You can inquire about our hours, location in Poranki, booking a table, menu recommendations, or online ordering. Feel free to call us directly at +91 9177173416 as well!",
      timestamp,
      options: ["View Opening Hours", "Find Our Location", "Chef recommendations"]
    };
  };

  return (
    <>
      {/* Chat Bubble Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Concierge"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-24 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-luxury-gold/20 bg-luxury-black text-luxury-gold shadow-xl backdrop-blur-md transition-colors hover:bg-luxury-gold hover:text-luxury-black"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 flex h-[480px] w-[360px] flex-col rounded-2xl border border-luxury-gold/20 bg-luxury-black shadow-2xl backdrop-blur-lg md:right-24"
          >
            {/* Header */}
            <div className="flex items-center justify-between rounded-t-2xl border-b border-luxury-gold/10 bg-luxury-dark p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-luxury-gold/30 bg-luxury-black text-luxury-gold">
                  <Utensils className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-luxury-gold">Grand Concierge</h3>
                  <span className="text-xs text-green-400">Online & Ready</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-luxury-gold/60 transition-colors hover:text-luxury-gold"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Message History */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                      msg.sender === 'user'
                        ? 'bg-luxury-gold text-luxury-black font-medium'
                        : 'bg-luxury-dark text-luxury-cream border border-luxury-gold/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                  
                  {/* Quick Options */}
                  {msg.options && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleOptionClick(opt)}
                          className="rounded-full border border-luxury-gold/30 bg-luxury-black/50 px-3 py-1 text-xs text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-colors"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions Footer */}
            <div className="px-4 py-2 border-t border-luxury-gold/5 bg-luxury-dark/30 flex justify-around text-luxury-gold/60">
              <button onClick={() => handleOptionClick("Opening Hours")} className="hover:text-luxury-gold flex flex-col items-center gap-0.5"><Clock size={14} /><span className="text-[10px]">Hours</span></button>
              <button onClick={() => handleOptionClick("Location")} className="hover:text-luxury-gold flex flex-col items-center gap-0.5"><MapPin size={14} /><span className="text-[10px]">Find Us</span></button>
              <button onClick={() => handleOptionClick("Reserve Table")} className="hover:text-luxury-gold flex flex-col items-center gap-0.5"><Calendar size={14} /><span className="text-[10px]">Reserve</span></button>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="flex items-center gap-2 border-t border-luxury-gold/10 bg-luxury-dark p-3 rounded-b-2xl"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-grow rounded-lg border border-luxury-gold/10 bg-luxury-black px-3 py-2 text-sm text-luxury-cream placeholder-luxury-gold/40 focus:border-luxury-gold/50 focus:outline-none"
              />
              <button
                type="submit"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-luxury-gold text-luxury-black transition-transform active:scale-95"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
