'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Sparkles } from 'lucide-react';

export default function WhatsAppBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  // Auto show a small prompt bubble after 3 seconds on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const schoolPhone = '923472943510'; // Iqra Public School Permoli WhatsApp Hotline (0347-2943510)
  const schoolFormattedPhone = '+92 (347) 294-3510';

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = userMsg.trim() || 'Hello Iqra Public School Permoli, I would like to inquire about admissions and school details.';
    const url = `https://wa.me/${schoolPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setUserMsg('');
    setIsOpen(false);
  };

  const quickQuestions = [
    'Admission for 2026-2027',
    'Fee Structure & Dues',
    'Transport / Bus Route in Permoli',
    'Schedule a Campus Visit',
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto select-none no-print">
      
      {/* Speech Bubble / Mini Chat Dialog */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden animate-fade-in-up transition-all duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 text-white p-4 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white text-emerald-700 flex items-center justify-center font-bold shadow-md">
                  <MessageCircle className="w-6 h-6 fill-current text-emerald-600" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">IPS Permoli Helpdesk</h4>
                <p className="text-[10px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                  Typically replies in minutes
                </p>
              </div>
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-emerald-50/50 space-y-3 max-h-72 overflow-y-auto">
            {/* Incoming Message Bubble */}
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm border border-emerald-100/80 text-xs text-slate-700 leading-relaxed">
              <p className="font-semibold text-emerald-800 mb-1">
                Assalam-o-Alaikum! Welcome to Iqra Public School Permoli 🌟
              </p>
              <p className="text-slate-600">
                How can our admissions and support team help you today?
              </p>
              <span className="text-[9px] text-slate-400 mt-1.5 block text-right">Official WhatsApp Support</span>
            </div>

            {/* Quick Question Chips */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] uppercase font-bold text-slate-400 px-1">Frequent Queries:</p>
              <div className="flex flex-wrap gap-1.5">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      const url = `https://wa.me/${schoolPhone}?text=${encodeURIComponent(`Hello Iqra Public School Permoli, I want to ask about: ${q}`)}`;
                      window.open(url, '_blank');
                      setIsOpen(false);
                    }}
                    className="text-[11px] font-medium bg-white hover:bg-emerald-600 hover:text-white text-slate-700 px-2.5 py-1 rounded-full border border-emerald-200 transition-all shadow-2xs"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              placeholder="Type your WhatsApp message..."
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-all shadow-md flex-shrink-0"
              title="Start WhatsApp Chat"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Prompt Pill (when closed) */}
      {!isOpen && hasPrompted && (
        <div 
          onClick={() => setIsOpen(true)}
          className="mb-2 bg-white px-3.5 py-2 rounded-2xl shadow-xl border border-emerald-100 text-xs text-slate-800 font-semibold flex items-center gap-2 animate-bounce-slow cursor-pointer hover:shadow-2xl transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Chat with <strong>IPS Permoli</strong> on WhatsApp!</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setHasPrompted(false);
            }}
            className="text-slate-400 hover:text-slate-600 p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main WhatsApp Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-400 text-white shadow-xl shadow-emerald-600/30 hover:shadow-2xl hover:shadow-emerald-600/50 hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Chat on WhatsApp with Iqra Public School Permoli"
      >
        {/* Pulsing Ripple Rings */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <div className="relative z-10 flex items-center justify-center">
          <MessageCircle className="w-7 h-7 fill-white text-emerald-600 group-hover:rotate-12 transition-transform duration-300" />
        </div>

        {/* Unread Alert Dot */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white font-black text-[9px] rounded-full border-2 border-white flex items-center justify-center">
          1
        </span>
      </button>

    </div>
  );
}
