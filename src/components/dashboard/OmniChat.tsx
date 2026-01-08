"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CONTACTS = [
    { id: 1, name: 'Mr. Silva', status: 'online', lastMsg: 'When does the stone arrive?' },
    { id: 2, name: 'Resort Manager', status: 'offline', lastMsg: 'Project update approved.' },
];

const MOCK_CHAT = [
    { id: 1, sender: 'Silva', text: 'Hello, I checked the site today.', time: '10:00 AM' },
    { id: 2, sender: 'You', text: 'Great! Hope you liked the progress.', time: '10:05 AM' },
    { id: 3, sender: 'Silva', text: 'Yes, looking good. When does the stone arrive for the pool?', time: '10:12 AM' },
];

const AURA_SUGGESTION = "Based on Shipment #420: The Volcanic Stone is scheduled to arrive on Tuesday, Jan 7th.";

export default function OmniChat() {
    const [messages, setMessages] = useState(MOCK_CHAT);
    const [input, setInput] = useState("");
    const [suggestionVisible, setSuggestionVisible] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { id: messages.length + 1, sender: 'You', text: input, time: 'Now' }]);
        setInput("");
        setSuggestionVisible(false); // Hide suggestion after sending
    };

    const useSuggestion = () => {
        setInput(AURA_SUGGESTION);
    };

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    return (
        <div className="glass-panel h-full flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-1/3 border-r border-white/5 bg-white/[0.02]">
                <div className="p-4 border-b border-white/5">
                    <h3 className="text-white font-serif text-sm">Messages</h3>
                </div>
                <div className="overflow-y-auto h-[calc(100%-53px)]">
                    {CONTACTS.map(contact => (
                        <div key={contact.id} className="p-4 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-0 border-l-2 border-l-transparent hover:border-l-gold">
                            <div className="flex justify-between mb-1">
                                <span className="text-white text-sm font-medium">{contact.name}</span>
                                <span className={`w-2 h-2 rounded-full ${contact.status === 'online' ? 'bg-green-500' : 'bg-stone-600'}`} />
                            </div>
                            <p className="text-white/40 text-xs truncate">{contact.lastMsg}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-xl p-3 ${msg.sender === 'You' ? 'bg-gold/10 text-gold-light border border-gold/20' : 'bg-white/5 text-stone-200'}`}>
                                <p className="text-sm">{msg.text}</p>
                                <p className="text-[10px] opacity-50 mt-1 text-right">{msg.time}</p>
                            </div>
                        </div>
                    ))}

                    {/* AURA Suggestion Bubble */}
                    <AnimatePresence>
                        {suggestionVisible && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="flex justify-start w-full"
                            >
                                <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30 rounded-xl p-3 max-w-[85%] cursor-pointer hover:border-purple-500/50 transition-colors group" onClick={useSuggestion}>
                                    <div className="flex items-center gap-2 mb-1 text-purple-300 text-xs font-semibold uppercase tracking-wider">
                                        <Bot size={12} /> AURA Intelligence Suggested
                                    </div>
                                    <p className="text-purple-100/80 text-sm group-hover:text-white transition-colors">
                                        "{AURA_SUGGESTION}"
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/5 bg-black/20">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold/30 text-sm"
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button
                            onClick={handleSend}
                            className="bg-gold text-black p-2 rounded-lg hover:bg-gold-light transition-colors"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
