"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Knowledge base for the chatbot
const knowledgeBase = {
  greeting: {
    keywords: ["hi", "hello", "hey", "howdy", "greetings"],
    responses: [
      "Hi there! 👋 I'm Tavishi's AI assistant. Ask me anything about her experience, skills, or projects!",
      "Hello! I'm here to help you learn about Tavishi. What would you like to know?",
    ],
  },
  experience: {
    keywords: ["experience", "work", "job", "career", "years", "accenture", "professional"],
    responses: [
      "Tavishi has 4+ years of experience as a Product Analyst at Accenture, where she managed enterprise HR and automation solutions. She's worked with cross-functional teams across time zones and delivered 250+ hours of automation savings. She was recognized with the FY22 All-Star Award and FY24 Growth Catalyst award!",
    ],
  },
  education: {
    keywords: ["education", "degree", "study", "university", "northwestern", "masters", "college", "school"],
    responses: [
      "Tavishi is currently pursuing her Master's in Engineering Management at Northwestern University with a perfect 4.0 GPA! She also holds a B.Tech in Information Technology from Dr. APJ Abdul Kalam Technical University with a 9.45/10 GPA (~3.8/4.0).",
    ],
  },
  skills: {
    keywords: ["skills", "technologies", "tools", "tech stack", "know", "capable"],
    responses: [
      "Tavishi's skills span Product Management (roadmapping, PRDs, user stories, Agile/Scrum), Technical (SQL, Python, Azure, SAP SuccessFactors), Analytics (A/B testing, Power BI, data analysis), and Design (Figma, wireframing, user research). She's particularly passionate about AI/ML and GenAI-enabled workflows!",
    ],
  },
  projects: {
    keywords: ["projects", "portfolio", "work samples", "case studies", "built"],
    responses: [
      "Tavishi has worked on exciting projects including: 1) SAP HR Enterprise Platform at Accenture (250+ hours automated), 2) GredMind AI energy management platform, 3) HomeTouch Meals food-tech platform, and 4) Website Redesign achieving 40% traffic increase. Click on any project card to see detailed case studies!",
    ],
  },
  contact: {
    keywords: ["contact", "reach", "email", "connect", "talk", "hire", "linkedin"],
    responses: [
      "You can reach Tavishi at tavishilnu2026@u.northwestern.edu or connect on LinkedIn at linkedin.com/in/tavishi-panwar. She's currently open to product management opportunities! 🚀",
    ],
  },
  location: {
    keywords: ["location", "where", "based", "live", "city"],
    responses: [
      "Tavishi is currently based in Evanston, IL, USA, pursuing her Master's at Northwestern University. She previously worked in Gurugram, India at Accenture.",
    ],
  },
  strengths: {
    keywords: ["strength", "good at", "best", "excel", "specialize"],
    responses: [
      "Tavishi excels at: 1) Translating complex technical requirements into clear product specs, 2) Data-driven decision making and A/B testing, 3) Cross-functional collaboration with engineering, UX, and stakeholders, 4) Competitive analysis and market research, and 5) Driving products from ideation to launch!",
    ],
  },
  achievements: {
    keywords: ["achievement", "award", "recognition", "accomplishment", "proud"],
    responses: [
      "Tavishi's notable achievements include: FY22 All-Star Award at Accenture, FY24 Growth Catalyst recognition, 250+ hours of manual processes automated, 20% efficiency improvement, and maintaining a perfect 4.0 GPA at Northwestern!",
    ],
  },
  interests: {
    keywords: ["interest", "passion", "hobby", "like", "enjoy", "fun"],
    responses: [
      "Beyond product management, Tavishi is deeply interested in AI infrastructure and GenAI-enabled workflows. She's passionate about building user-centric solutions that create real impact. She loves analyzing data patterns and turning insights into product improvements!",
    ],
  },
  why_hire: {
    keywords: ["why hire", "why should", "unique", "different", "stand out"],
    responses: [
      "Tavishi brings a unique blend of technical depth and product intuition. With 4+ years at Accenture handling enterprise-scale products, a Master's from Northwestern, and hands-on experience with AI/ML, she bridges the gap between business vision and technical execution. Her track record of measurable impact (250+ hours automated, 20% efficiency gains) speaks to her results-oriented approach!",
    ],
  },
};

const suggestedQuestions = [
  "What's her experience?",
  "Tell me about her skills",
  "What projects has she worked on?",
  "How can I contact her?",
];

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi! 👋 I'm Tavishi's AI assistant. Ask me anything about her experience, skills, or projects! Try: \"What's her experience?\" or \"Tell me about her skills\"",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const findResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    // Check each category in knowledge base
    for (const [, data] of Object.entries(knowledgeBase)) {
      for (const keyword of data.keywords) {
        if (lowerQuery.includes(keyword)) {
          return data.responses[Math.floor(Math.random() * data.responses.length)];
        }
      }
    }

    // Default response
    return "I'm not sure about that specific question, but I'd be happy to tell you about Tavishi's experience, skills, projects, or how to contact her. What would you like to know?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700));

    const response = findResponse(input);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: "bot",
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full gradient-bg text-white shadow-lg shadow-primary/30 flex items-center justify-center ${isOpen ? "hidden" : ""}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {/* Notification dot */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[380px] h-[100dvh] sm:h-[500px] bg-card sm:rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="gradient-bg p-4 flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/tavishi_avatar.png"
                  alt="Tavishi"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white/30"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">Tavishi&apos;s Assistant</h3>
                <p className="text-xs text-white/70">Ask me anything!</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      message.sender === "user"
                        ? "gradient-bg text-white rounded-br-sm"
                        : "bg-secondary rounded-bl-sm"
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-secondary rounded-2xl rounded-bl-sm p-3 flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleQuickQuestion(q)}
                      className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-accent transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about Tavishi..."
                  className="flex-1 px-4 py-2 rounded-xl bg-secondary border-none outline-none text-sm focus:ring-2 focus:ring-primary/20"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl gradient-bg text-white flex items-center justify-center disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
