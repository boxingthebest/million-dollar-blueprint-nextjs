"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle, Sparkles } from "lucide-react";
import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
  quickReplies?: string[];
}

const QUICK_REPLY_OPTIONS = [
  "💼 Help me get promoted",
  "💰 I want to earn more",
  "🤖 Worried about AI taking my job",
  "📦 Show me bundle options",
];

const SOCIAL_PROOF_MESSAGES = [
  "🔥 A product manager from Google just enrolled",
  "📈 We just hit 450+ students this week",
  "⭐ A director from Salesforce grabbed the VIP bundle",
  "🚀 3 people enrolled in the last hour",
  "💼 An Amazon exec just signed up",
];

export default function ApexChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey! I'm Apex, your AI guide to the top. 🚀 I help ambitious professionals reach six figures and beyond. What's your biggest career goal right now?",
      quickReplies: QUICK_REPLY_OPTIONS,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);
  const [showSocialProof, setShowSocialProof] = useState(false);
  const [socialProofMessage, setSocialProofMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show chatbot after 5 seconds or after scrolling down
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsVisible(true);
      }
      setIsScrolling(true);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      clearTimeout(scrollTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Social proof notification (shows randomly when chat is open)
  useEffect(() => {
    if (!isOpen) return;
    
    const showRandomSocialProof = () => {
      const randomMessage = SOCIAL_PROOF_MESSAGES[Math.floor(Math.random() * SOCIAL_PROOF_MESSAGES.length)];
      setSocialProofMessage(randomMessage);
      setShowSocialProof(true);
      setTimeout(() => setShowSocialProof(false), 4000);
    };

    // Show first one after 15 seconds
    const initialTimer = setTimeout(showRandomSocialProof, 15000);
    
    // Then show every 45-90 seconds randomly
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        showRandomSocialProof();
      }
    }, 45000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isOpen]);

  // Exit intent - re-engage after 45 seconds of inactivity
  useEffect(() => {
    if (!isOpen || hasShownExitIntent || messages.length < 3) return;

    const checkInactivity = setInterval(() => {
      const inactiveTime = Date.now() - lastActivityTime;
      if (inactiveTime > 45000 && !hasShownExitIntent) {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "Still there? 👋 No pressure at all - I know it's a big decision. If budget is a concern, the Flagship Bundle at $397 is a great starting point (2 courses, saves $197). What's the main thing holding you back? Maybe I can help.",
          quickReplies: ["💵 Price is a concern", "⏰ I need more time", "❓ I have questions", "✅ I'm ready to enroll"],
        }]);
        setHasShownExitIntent(true);
      }
    }, 10000);

    return () => clearInterval(checkInactivity);
  }, [isOpen, lastActivityTime, hasShownExitIntent, messages.length]);

  const sendMessage = async (messageText?: string) => {
    const userMessage = messageText || input.trim();
    if (!userMessage || isLoading) return;

    setInput("");
    setLastActivityTime(Date.now());
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      const data = await response.json();
      
      // Determine if we should show quick replies based on response
      let quickReplies: string[] | undefined;
      const lowerResponse = data.message.toLowerCase();
      
      if (lowerResponse.includes("which course") || lowerResponse.includes("what's your goal") || lowerResponse.includes("what are you looking")) {
        quickReplies = QUICK_REPLY_OPTIONS;
      } else if (lowerResponse.includes("ready to") || lowerResponse.includes("get started") || lowerResponse.includes("enroll")) {
        quickReplies = ["✅ Yes, I'm ready!", "💵 What's the best deal?", "❓ I have more questions"];
      } else if (lowerResponse.includes("bundle") || lowerResponse.includes("pricing")) {
        quickReplies = ["📦 Tell me about Professional Bundle", "🚀 What's in VIP?", "💰 What's the cheapest option?"];
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.message, quickReplies }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {isVisible && !isOpen && !isScrolling && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-50 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-full p-2 shadow-2xl hover:scale-110 transition-all duration-300 group"
          aria-label="Open chat with Apex"
        >
          <div className="relative w-14 h-14 rounded-full bg-white p-1.5 flex items-center justify-center">
            <Image
              src="/apex-avatar.png"
              alt="Apex"
              width={56}
              height={56}
              className="rounded-full"
            />
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></span>
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Chat with Apex 💬
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isVisible && isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-slate-900 border-2 border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 flex items-center justify-between relative">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full bg-white p-1">
                <Image
                  src="/apex-avatar.png"
                  alt="Apex"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <div>
                <h3 className="font-bold text-white flex items-center gap-1">
                  Apex <Sparkles className="w-4 h-4 text-yellow-300" />
                </h3>
                <p className="text-xs text-cyan-100">Your AI Success Partner • Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Social Proof Toast */}
            {showSocialProof && (
              <div className="absolute -bottom-12 left-4 right-4 bg-slate-800 border border-cyan-500/30 rounded-lg px-3 py-2 text-xs text-white animate-fade-in-up shadow-lg">
                {socialProofMessage}
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
            {messages.map((msg, idx) => (
              <div key={idx}>
                <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                        : "bg-slate-800 text-slate-100 border border-cyan-500/20"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
                
                {/* Quick Reply Buttons */}
                {msg.role === "assistant" && msg.quickReplies && idx === messages.length - 1 && !isLoading && (
                  <div className="flex flex-wrap gap-2 mt-3 ml-2">
                    {msg.quickReplies.map((reply, replyIdx) => (
                      <button
                        key={replyIdx}
                        onClick={() => handleQuickReply(reply)}
                        className="bg-slate-800 hover:bg-slate-700 border border-cyan-500/30 hover:border-cyan-500 text-cyan-400 text-xs px-3 py-2 rounded-full transition-all hover:scale-105"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-cyan-500/20 rounded-2xl px-4 py-3">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Urgency Banner */}
          <div className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 border-t border-orange-500/30 px-4 py-2">
            <p className="text-xs text-center text-orange-300">
              🔥 Founding pricing ends Jan 15th • <span className="font-semibold">440+ enrolled</span>
            </p>
          </div>

          {/* Input */}
          <div className="p-4 bg-slate-900 border-t border-slate-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setLastActivityTime(Date.now());
                }}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-all text-sm"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
