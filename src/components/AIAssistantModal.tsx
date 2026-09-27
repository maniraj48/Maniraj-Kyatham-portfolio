import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bot, Send, X, Sparkles, User, RefreshCw, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { ChatMessage } from '../types';
import { sounds } from '../utils/soundEffects';
import { usePortrait } from '../utils/usePortrait';
import { lockScroll, unlockScroll } from '../utils/scrollLock';
import { getOfflineAssistantReply } from '../utils/offlineAssistant';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const { portraitSrc } = usePortrait();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: "Hello! I am Maniraj's AI Portfolio Assistant. Ask me anything about Maniraj Kyatham's B.Tech IT degree, Python/FastAPI projects, sub-40ms SQL query optimization, technical skills, or hiring availability!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const promptsScrollRef = useRef<HTMLDivElement>(null);

  const scrollPrompts = (direction: 'left' | 'right') => {
    sounds.playClick();
    if (promptsScrollRef.current) {
      const scrollOffset = direction === 'left' ? -200 : 200;
      promptsScrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  // Background scroll lock and escape listener
  useEffect(() => {
    if (!isOpen) return;

    lockScroll('ai-modal');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      unlockScroll('ai-modal');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || inputMsg;
    if (!messageText.trim() || isLoading) return;

    sounds.playClick();

    const userMessage: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMsg('');
    setIsLoading(true);

    try {
      // Natural responsive delay for typing feel (250ms), zero external API required
      await new Promise((r) => setTimeout(r, 260));

      let replyText = '';
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: messageText }),
        });
        const data = await res.json();
        replyText = data.reply;
      } catch {
        // Direct local fallback
        replyText = getOfflineAssistantReply(messageText);
      }

      if (!replyText) {
        replyText = getOfflineAssistantReply(messageText);
      }

      sounds.playSuccess();

      const aiReply: ChatMessage = {
        id: Math.random().toString(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOffline: false,
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (e) {
      const fallbackText = getOfflineAssistantReply(messageText);
      const errorReply: ChatMessage = {
        id: Math.random().toString(),
        sender: 'assistant',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOffline: false,
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    sounds.playClick();
    setMessages([
      {
        id: 'init-1',
        sender: 'assistant',
        text: "Hello! I am Maniraj's AI Portfolio Assistant. Ask me anything about Maniraj Kyatham's B.Tech IT degree, Python/FastAPI projects, sub-40ms SQL query optimization, technical skills, or hiring availability!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const sampleQuestions = [
    "What are Maniraj's core technical skills?",
    "Tell me about the Subscription Churn project & <40ms SQL optimization.",
    "Tell me about Knowledge Vault AI (offline intelligence).",
    "Is Maniraj available for software engineering roles?",
    "What is his education background and CGPA?",
    "How can I contact Maniraj directly or on X?",
    "Tell me about his AI internship at Edunet / Shell."
  ];

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-[9995] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md"
    >
      <div
        className="fixed inset-0"
        onClick={() => {
          sounds.playClick();
          onClose();
        }}
        aria-hidden="true"
      />

      <motion.div
        data-lenis-prevent="true"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl h-[92dvh] sm:h-[580px] max-h-[660px] rounded-2xl sm:rounded-3xl border border-white/15 bg-[#0F0E0C] shadow-2xl flex flex-col overflow-hidden text-[#E8E4DE] z-10"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="shrink-0 px-4 sm:px-6 py-3.5 sm:py-4 bg-[#141516] border-b border-white/10 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-accent/40 shadow-sm shrink-0">
              <img
                src={portraitSrc}
                alt="Maniraj Kyatham"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-cream flex items-center gap-2">
                <span>PORTFOLIO INTELLIGENCE</span>
              </h3>
              <p className="text-[10px] sm:text-[11px] text-[#8A8275] font-mono">Interactive Portfolio Assistant • Ask anything about Maniraj</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetChat}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/40 border border-white/10 text-[#8A8275] hover:text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              title="Reset Chat & Questions"
              aria-label="Reset Chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/40 border border-white/10 text-warm hover:text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              aria-label="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat History — Fluidly Scrollable */}
        <div
          data-lenis-prevent="true"
          ref={chatScrollRef}
          tabIndex={0}
          className="flex-1 p-3.5 sm:p-5 overflow-y-auto overscroll-contain touch-pan-y space-y-3.5 sm:space-y-4 bg-[#0F0E0C] code-scroll focus:outline-none"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 sm:gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 overflow-hidden ${
                  msg.sender === 'user'
                    ? 'bg-accent text-white font-bold text-xs'
                    : 'bg-surface border border-accent/40'
                }`}
              >
                {msg.sender === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <img
                    src={portraitSrc}
                    alt="Maniraj Assistant"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                )}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3 sm:p-4 text-xs leading-relaxed shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-accent text-white font-semibold rounded-tr-none'
                    : 'bg-surface border border-white/10 text-gray-soft rounded-tl-none font-medium'
                }`}
              >
                <div className="whitespace-pre-line text-cream">{msg.text}</div>
                <div
                  className={`text-[10px] mt-1.5 font-mono ${
                    msg.sender === 'user' ? 'text-white/80' : 'text-warm'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs font-mono text-accent p-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing Maniraj's background...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompt Chips (Permanently visible with modern sleek scrollbar and slide controls) */}
        <div
          data-lenis-prevent="true"
          className="shrink-0 px-2 sm:px-4 py-2 bg-[#121214] border-t border-white/10 flex items-center gap-1.5 sm:gap-2 z-10"
        >
          {/* Label */}
          <div className="shrink-0 flex items-center gap-1 font-mono text-[10px] text-accent tracking-wider uppercase font-semibold pl-1 select-none">
            <Sparkles className="w-3 h-3 text-accent" />
            <span className="hidden sm:inline">Suggested:</span>
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => scrollPrompts('left')}
            className="w-6 h-6 rounded-md bg-white/5 hover:bg-white/15 border border-white/10 text-warm hover:text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer active:scale-90"
            title="Scroll left"
            aria-label="Scroll prompts left"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Scrollable Prompts Container with sleek modern scrollbar */}
          <div
            ref={promptsScrollRef}
            onWheel={(e) => {
              if (e.deltaY !== 0 && promptsScrollRef.current) {
                promptsScrollRef.current.scrollLeft += e.deltaY;
              }
            }}
            className="flex-1 flex items-center gap-2 overflow-x-auto overscroll-contain touch-pan-x sleek-horizontal-scroll py-1 pb-2"
          >
            {sampleQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-[11px] text-[#B8B2A7] hover:text-cream hover:border-accent/70 hover:bg-accent/15 transition-all font-mono cursor-pointer shrink-0 min-h-[30px] active:scale-95 disabled:opacity-50 whitespace-nowrap shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => scrollPrompts('right')}
            className="w-6 h-6 rounded-md bg-white/5 hover:bg-white/15 border border-white/10 text-warm hover:text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer active:scale-90"
            title="Scroll right"
            aria-label="Scroll prompts right"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Input Bar */}
        <div className="shrink-0 p-3 sm:p-4 bg-surface border-t border-white/10 flex items-center gap-2 z-20">
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about projects, SQL optimization, or hiring..."
            className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3.5 sm:px-4 py-2.5 text-base sm:text-xs font-mono text-cream placeholder-warm/50 focus:outline-none focus:border-accent min-h-[44px]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputMsg.trim() || isLoading}
            className="w-11 h-11 sm:w-auto px-0 sm:px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-light disabled:opacity-50 text-white font-bold text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center cursor-pointer shadow-md min-h-[44px] shrink-0 active:scale-95"
            aria-label="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
