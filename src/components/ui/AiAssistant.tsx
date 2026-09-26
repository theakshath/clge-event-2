'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Navigation, Sparkles } from 'lucide-react';
import { ASSISTANT_KNOWLEDGE_BASE, BUILDINGS, BuildingData } from '@/data/campusData';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  targetLocationId?: string;
  targetBuilding?: BuildingData;
}

interface AiAssistantProps {
  onShowLocation: (building: BuildingData) => void;
}

export function AiAssistant({ onShowLocation }: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Hello! I am UniVerse AI, your interactive campus guide. Ask me where any block is, or ask what events are taking place on campus!'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText) return;

    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Process Response using Context Knowledge Base
    setTimeout(() => {
      const q = queryText.toLowerCase();

      // Find matching knowledge entry
      const match = ASSISTANT_KNOWLEDGE_BASE.find((entry) =>
        entry.keywords.some((kw) => q.includes(kw))
      );

      let responseText = "I can help you locate buildings and find campus events! Try asking 'Where is the CSE block?' or 'Where is the central library?'";
      let targetBuilding: BuildingData | undefined = undefined;

      if (match) {
        responseText = match.response;
        if (match.targetLocationId) {
          targetBuilding = BUILDINGS.find((b) => b.id === match.targetLocationId);
        }
      } else {
        // Direct building name fallback search
        const bMatch = BUILDINGS.find((b) =>
          q.includes(b.name.toLowerCase()) || q.includes(b.shortName.toLowerCase()) || q.includes(b.category.toLowerCase())
        );
        if (bMatch) {
          responseText = `${bMatch.name} (${bMatch.category}) is located on campus. Facilities include: ${bMatch.facilities.join(', ')}.`;
          targetBuilding = bMatch;
        }
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: responseText,
        targetLocationId: targetBuilding?.id,
        targetBuilding
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 400);
  };

  const sampleQuestions = [
    'Where is the CSE block?',
    'What events are happening this week?',
    'Where is the library?'
  ];

  return (
    <div id="assistant" className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 bg-slate-900 hover:bg-blue-600 text-white font-semibold text-sm px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-slate-700/50 cursor-pointer"
        >
          <MessageSquare className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors animate-pulse" />
          <span>Ask UniVerse</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-[340px] sm:w-[400px] h-[520px] bg-white/95 backdrop-blur-2xl rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm">UniVerse AI</h3>
                  <span className="text-[10px] font-semibold bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full">
                    Campus Assistant
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Context-Aware 3D Navigator</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestion Pills */}
          <div className="bg-slate-50 border-b border-slate-100 p-2.5 flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-1" />
            {sampleQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-2.5 py-1 bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium rounded-lg border border-slate-200/80 shadow-2xs transition-colors shrink-0 text-[11px] cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-start gap-2 max-w-[85%]">
                  {msg.sender === 'assistant' && (
                    <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs shrink-0 mt-1">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none shadow-md font-medium'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-sm font-normal'
                    }`}
                  >
                    {msg.text}

                    {/* Action Button inside response */}
                    {msg.targetBuilding && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100">
                        <button
                          onClick={() => {
                            if (msg.targetBuilding) {
                              onShowLocation(msg.targetBuilding);
                            }
                          }}
                          className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white font-semibold text-[11px] py-2 px-3 rounded-xl shadow-xs transition-all cursor-pointer"
                        >
                          <Navigation className="w-3.5 h-3.5 text-blue-400" />
                          <span>Show on 3D Map</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-6 h-6 rounded-lg bg-slate-800 text-white flex items-center justify-center text-xs shrink-0 mt-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about campus buildings or events..."
              className="flex-1 bg-slate-100 text-slate-900 text-xs font-medium px-3.5 py-2.5 rounded-xl border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-blue-600 disabled:opacity-50 hover:bg-blue-700 text-white p-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
