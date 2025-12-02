import React, { useState, useEffect, useRef } from 'react';
import { ElementData } from '../types';
import { getElementExplanation, getFunFact, chatWithTutor } from '../services/geminiService';
import { Bot, Sparkles, Send, Loader2 } from 'lucide-react';

interface AITutorProps {
  element: ElementData;
}

interface Message {
    role: 'user' | 'model';
    text: string;
}

const AITutor: React.FC<AITutorProps> = ({ element }) => {
  const [activeTab, setActiveTab] = useState<'facts' | 'chat'>('facts');
  const [explanation, setExplanation] = useState<string>("");
  const [funFact, setFunFact] = useState<string>("");
  const [loadingFact, setLoadingFact] = useState(false);
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
      {role: 'model', text: "Hi! I'm Bohr-Bot. Ask me anything about this atom!"}
  ]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingFact(true);
      const [expl, fact] = await Promise.all([
        getElementExplanation(element),
        getFunFact(element)
      ]);
      setExplanation(expl);
      setFunFact(fact);
      setLoadingFact(false);
      
      // Reset chat on element change
      setMessages([{role: 'model', text: `Hi! I'm Bohr-Bot. Ask me anything about ${element.name}!` }]);
    };
    fetchData();
  }, [element]);

  // Auto-scroll chat
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeTab]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chatLoading) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatLoading(true);

    // Convert internal message format to Gemini history format
    const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
    }));

    const response = await chatWithTutor(history, userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setChatLoading(false);
  };

  return (
    <div className="bg-space-800 rounded-2xl border border-gray-700 shadow-xl overflow-hidden flex flex-col h-full max-h-[600px]">
        {/* Header */}
        <div className="bg-space-900 p-4 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="bg-neon-purple/20 p-2 rounded-lg">
                    <Bot className="w-5 h-5 text-neon-purple" />
                </div>
                <h3 className="font-bold text-white font-display">Bohr-Bot AI</h3>
            </div>
            <div className="flex bg-space-800 rounded-lg p-1">
                <button 
                    onClick={() => setActiveTab('facts')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${activeTab === 'facts' ? 'bg-space-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                >
                    Facts
                </button>
                <button 
                    onClick={() => setActiveTab('chat')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${activeTab === 'chat' ? 'bg-space-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                >
                    Chat
                </button>
            </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar" ref={scrollRef}>
            {activeTab === 'facts' ? (
                <div className="space-y-6">
                    {loadingFact ? (
                        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                            <Loader2 className="w-8 h-8 animate-spin mb-2 text-neon-blue" />
                            <p>Consulting the archives...</p>
                        </div>
                    ) : (
                        <>
                            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-4 rounded-xl border border-indigo-500/30">
                                <h4 className="text-neon-blue text-sm font-bold mb-2 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" /> AI Explanation
                                </h4>
                                <p className="text-gray-200 text-sm leading-relaxed">{explanation}</p>
                            </div>

                            <div className="bg-space-900 p-4 rounded-xl border border-gray-700 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-neon-yellow/10 rounded-full blur-xl -mr-8 -mt-8"></div>
                                <h4 className="text-neon-yellow text-sm font-bold mb-2">Did You Know?</h4>
                                <p className="text-gray-300 text-sm italic">"{funFact}"</p>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                                msg.role === 'user' 
                                ? 'bg-neon-blue text-space-900 font-medium rounded-tr-none' 
                                : 'bg-space-700 text-gray-200 rounded-tl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {chatLoading && (
                        <div className="flex justify-start">
                             <div className="bg-space-700 rounded-2xl rounded-tl-none p-3 flex gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                             </div>
                        </div>
                    )}
                </div>
            )}
        </div>

        {/* Chat Input */}
        {activeTab === 'chat' && (
             <form onSubmit={handleSendMessage} className="p-3 bg-space-900 border-t border-gray-700 flex gap-2">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about this atom..." 
                    className="flex-1 bg-space-800 border-transparent focus:border-neon-blue rounded-xl px-4 text-sm text-white placeholder-gray-500 focus:outline-none border focus:ring-1 focus:ring-neon-blue"
                />
                <button 
                    type="submit"
                    disabled={chatLoading || !input.trim()}
                    className="bg-neon-blue hover:bg-cyan-400 text-space-900 p-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Send className="w-5 h-5" />
                </button>
             </form>
        )}
    </div>
  );
};

export default AITutor;
