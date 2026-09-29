import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../../types';
import { 
  SUGGESTED_QUERIES, 
  PRESET_RAG_ANSWERS 
} from '../../data/mockData';
import { 
  Mic, 
  MicOff, 
  Send, 
  Bot, 
  User, 
  Database, 
  FileText, 
  Sparkles, 
  Zap,
  Volume2,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

export const VoiceRagAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'sutra',
      text: 'SUTRA Cognitive Flight Copilot initialized on local Jetson unified VRAM. 10,000+ pages of ISRO BAS flight manuals & emergency SOPs indexed via FAISS GPU. How may I assist your zero-g procedure?',
      timestamp: '14:22:01',
      modelUsed: 'Llama-3-8B-Instruct (4-Bit GGUF)',
      inferenceTimeMs: 42
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSend = (queryText: string) => {
    if (!queryText.trim()) return;
    playSound('beep');

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsGenerating(true);

    // Simulated local RAG response from FAISS + Llama-3-8B
    setTimeout(() => {
      playSound('success');
      const preset = PRESET_RAG_ANSWERS[queryText] || {
        answer: `According to ISRO Microgravity Experiment Guidelines (SUTRA-SOP-AUTO), optimal operation for "${queryText}" requires maintaining standard 37°C thermal boundaries and confirming glovebox seal integrity before tool contact. Ensure real-time telemetry confirmation on the central HUD.`,
        citation: {
          manual: 'ISRO-BAS-FLIGHT-MAN-REV4',
          section: 'Section 2.4 — Microgravity Safety Standards',
          similarityScore: 0.924,
          chunkText: 'Crew operation compliance: Verify hermetic seal and latch locking pin before starting chemical transfer.'
        }
      };

      const sutraMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'sutra',
        text: preset.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        modelUsed: 'Llama-3-8B (Q4_K_M GGUF)',
        inferenceTimeMs: Math.floor(65 + Math.random() * 25),
        sourceCitations: [preset.citation]
      };

      setMessages(prev => [...prev, sutraMsg]);
      setIsGenerating(false);
    }, 900);
  };

  const toggleMic = () => {
    playSound('click');
    if (!isListening) {
      setIsListening(true);
      playSound('scan');
      // Simulate speech-to-text recognition via Whisper.cpp
      setTimeout(() => {
        setIsListening(false);
        const randomQuery = SUGGESTED_QUERIES[Math.floor(Math.random() * SUGGESTED_QUERIES.length)];
        handleSend(randomQuery);
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="hud-panel rounded-2xl bg-slate-900/80 border border-slate-700/80 p-5 flex flex-col h-full justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded bg-blue-500/20 text-blue-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              Voice & Cognitive RAG Copilot
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Offline Llama-3-8B + Whisper.cpp + FAISS Vector Search
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
          <Database className="w-3 h-3" />
          <span>GPU RAG: 0% CLOUD</span>
        </div>
      </div>

      {/* Suggested Quick Queries Pills */}
      <div className="py-2.5 overflow-x-auto flex items-center space-x-2 no-scrollbar">
        <span className="text-[10px] font-mono text-slate-500 uppercase shrink-0">
          PROMPT:
        </span>
        {SUGGESTED_QUERIES.slice(0, 3).map((query, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(query)}
            className="text-[11px] font-mono text-slate-300 bg-slate-950/80 hover:bg-blue-600/20 hover:text-blue-300 hover:border-blue-500/40 border border-slate-800 px-2.5 py-1 rounded-lg shrink-0 transition-all text-left"
          >
            {query}
          </button>
        ))}
      </div>

      {/* Message Chat History */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 my-2 max-h-[340px]">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center space-x-1.5 text-[10px] font-mono text-slate-500 mb-1">
              <span>{msg.sender === 'user' ? 'ASTRONAUT (CREW)' : 'SUTRA AI'}</span>
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            <div
              className={`p-3 rounded-xl max-w-[92%] text-xs font-sans leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/20 font-mono'
                  : 'bg-slate-950/90 text-slate-200 border border-slate-800 rounded-bl-none'
              }`}
            >
              {msg.text}

              {/* Local FAISS Vector Citation Card */}
              {msg.sourceCitations && msg.sourceCitations.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] font-mono bg-slate-900/90 p-2 rounded-lg text-slate-300">
                  <div className="flex items-center justify-between text-blue-400 font-bold mb-1">
                    <span className="flex items-center space-x-1">
                      <FileText className="w-3 h-3" />
                      <span>{msg.sourceCitations[0].manual}</span>
                    </span>
                    <span className="text-emerald-400">
                      Match: {(msg.sourceCitations[0].similarityScore * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-slate-400 text-[10px]">
                    {msg.sourceCitations[0].section}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-400 italic bg-slate-950 p-1.5 rounded border border-slate-800/80">
                    "{msg.sourceCitations[0].chunkText}"
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isGenerating && (
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800 w-fit">
            <Sparkles className="w-4 h-4 animate-spin text-blue-400" />
            <span>FAISS GPU Vector Retrieval & Llama-3-8B Inference...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice Waveform Activity Overlay if listening */}
      {isListening && (
        <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-500/50 mb-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mic className="w-4 h-4 text-rose-400 animate-pulse" />
            <span className="text-xs font-mono text-blue-300">Whisper.cpp Streaming STT Listening...</span>
          </div>
          {/* Animated Waveform Bars */}
          <div className="flex items-center space-x-1">
            {[12, 24, 32, 18, 28, 14, 26, 36, 16, 22].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-blue-400 rounded-full animate-pulse"
                style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
              ></span>
            ))}
          </div>
        </div>
      )}

      {/* Input Box & Voice Trigger */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend(inputQuery);
        }}
        className="flex items-center space-x-2 pt-2 border-t border-slate-800"
      >
        <button
          type="button"
          onClick={toggleMic}
          className={`p-2 rounded-xl border transition-all ${
            isListening
              ? 'bg-rose-600 text-white border-rose-400 animate-pulse'
              : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-blue-400 hover:border-blue-500/40'
          }`}
          title="Simulate Whisper.cpp Voice Input"
        >
          {isListening ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          placeholder="Ask SUTRA about SOPs, parameters, or contingencies..."
          value={inputQuery}
          onChange={e => setInputQuery(e.target.value)}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
        />

        <button
          type="submit"
          disabled={!inputQuery.trim() || isGenerating}
          className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white transition-all shadow-md shadow-blue-600/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
