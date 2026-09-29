import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  Database, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Cpu, 
  ShieldCheck,
  Search,
  BookOpen
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';
import { SUGGESTED_QUERIES, PRESET_RAG_ANSWERS } from '../../data/mockData';
import { ChatMessage } from '../../types';

export const CopilotShowcaseSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'sutra',
      text: 'SUTRA Cognitive Copilot ready. 10,000+ pages of ISRO BAS payload manuals, SOPs, and contingency directives loaded into local Jetson GPU unified memory via FAISS. Ask any procedural question below:',
      timestamp: '11:50:02',
      modelUsed: 'Llama-3-8B-Instruct (4-Bit GGUF)',
      inferenceTimeMs: 38,
      sourceCitations: [
        {
          manual: 'ISRO-BAS-FLIGHT-MAN-REV4',
          section: 'Section 1.1 — Mission Architecture & Onboard Edge Copilot',
          similarityScore: 0.985,
          chunkText: 'System status: 100% offline edge inference operational. Zero ground uplink dependency.'
        }
      ]
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
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsGenerating(true);

    setTimeout(() => {
      playSound('success');
      const preset = PRESET_RAG_ANSWERS[queryText] || {
        answer: `According to ISRO Microgravity SOP guidelines, optimal execution for "${queryText}" requires maintaining standard 37.0°C thermal boundaries and confirming glovebox seal integrity before tool manipulation. Zero-g surface tension requires 45° nozzle alignment.`,
        citation: {
          manual: 'ISRO-BAS-BIO-MAN-004',
          section: 'Section 4.2.1 — Thermal Equilibrium & Fluid Physics',
          similarityScore: 0.942,
          chunkText: 'Param: Temp=37.0C(+/-0.2); Gas=5% CO2 balanced N2; Lock dual latch pins prior to heater enable cycle.'
        }
      };

      const sutraMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'sutra',
        text: preset.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'Llama-3-8B (Q4_K_M GGUF)',
        inferenceTimeMs: Math.floor(55 + Math.random() * 20),
        sourceCitations: [preset.citation]
      };

      setMessages(prev => [...prev, sutraMsg]);
      setIsGenerating(false);
    }, 800);
  };

  const toggleMic = () => {
    playSound('click');
    if (!isListening) {
      setIsListening(true);
      playSound('scan');
      setTimeout(() => {
        setIsListening(false);
        const randomQuery = SUGGESTED_QUERIES[Math.floor(Math.random() * SUGGESTED_QUERIES.length)];
        handleSend(randomQuery);
      }, 2400);
    } else {
      setIsListening(false);
    }
  };

  return (
    <section id="copilot-showcase" className="py-20 px-6 sm:px-12 bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-semibold mb-3 shadow-sm">
            <Bot className="w-4 h-4 text-blue-600" />
            <span>CORE REVOLUTIONARY MODULE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Local Cognitive RAG & <span className="text-gradient-cyan-blue">Voice Copilot</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
            Zero-cloud, 100% offline conversational SOP adherence. Queries 10,000+ pages of ISRO BAS flight manuals with Whisper.cpp speech recognition in &lt;3ms.
          </p>
        </div>

        {/* Big Interactive Copilot Card (Light Aerospace Glassmorphism) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Key Features & Architecture Badges (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="light-glass-panel-elevated p-6 rounded-3xl space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">FAISS GPU Dense Index</h3>
                  <p className="text-xs text-slate-500 font-mono">100% Offline Local Search</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pre-indexed HNSW vector embeddings over all ISRO experiment protocols, safety contingency checklists, and glovebox specifications.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Vector Lookup Time:</span>
                  <span className="text-emerald-600 font-bold">&lt; 2.8 ms</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Quantized Model:</span>
                  <span className="text-blue-600 font-bold">Llama-3-8B Q4_K_M</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Generation Speed:</span>
                  <span className="text-purple-600 font-bold">28.4 Tokens/Sec</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Ground Telemetry Uplink:</span>
                  <span className="text-emerald-600 font-bold">0 KB (Zero Cloud)</span>
                </div>
              </div>
            </div>

            {/* Prompt Quick Launch Card */}
            <div className="light-glass-panel p-5 rounded-3xl">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                <Search className="w-3.5 h-3.5 text-blue-600" />
                <span>Suggested Flight Queries:</span>
              </div>
              <div className="space-y-2">
                {SUGGESTED_QUERIES.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="w-full text-left text-xs p-2.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 text-slate-700 transition-all flex items-center justify-between group shadow-sm"
                  >
                    <span className="line-clamp-1">{q}</span>
                    <span className="text-blue-500 font-bold group-hover:translate-x-0.5 transition-transform">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Chat Widget (8 Cols) */}
          <div className="lg:col-span-8 light-glass-panel-elevated p-6 rounded-3xl flex flex-col h-[580px] shadow-2xl justify-between border-slate-300">
            {/* Top Copilot Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-bold text-slate-900">SUTRA Cognitive Space Copilot</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                      OFFLINE RAG ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">
                    Jetson AGX Orin • Llama-3-8B GGUF • FAISS Index
                  </p>
                </div>
              </div>

              <div className="text-right hidden sm:block">
                <span className="text-xs font-mono text-slate-500">Similarity Threshold:</span>
                <span className="block text-xs font-mono font-bold text-blue-700">Cosine &gt; 0.90</span>
              </div>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-1">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center space-x-1.5 text-[11px] font-mono text-slate-400 mb-1">
                    <span>{msg.sender === 'user' ? 'ASTRONAUT / CREW' : 'SUTRA AI COPILOT'}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl max-w-[90%] text-xs sm:text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none font-medium'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                    }`}
                  >
                    {msg.text}

                    {/* Grounded Citation Card */}
                    {msg.sourceCitations && msg.sourceCitations.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-100 text-xs font-mono bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between text-blue-700 font-bold mb-1">
                          <span className="flex items-center space-x-1.5">
                            <FileText className="w-3.5 h-3.5" />
                            <span>{msg.sourceCitations[0].manual}</span>
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px]">
                            Match: {(msg.sourceCitations[0].similarityScore * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="text-slate-500 text-[11px]">
                          {msg.sourceCitations[0].section}
                        </div>
                        <div className="mt-1.5 text-[11px] text-slate-700 italic bg-white p-2 rounded-lg border border-slate-200">
                          "{msg.sourceCitations[0].chunkText}"
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isGenerating && (
                <div className="flex items-center space-x-2.5 text-xs font-mono text-blue-700 bg-blue-50 p-3 rounded-2xl border border-blue-200 w-fit">
                  <Sparkles className="w-4 h-4 animate-spin text-blue-600" />
                  <span>Searching FAISS vector index & generating Llama-3-8B response...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Listening Waveform Bar */}
            {isListening && (
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 mb-3 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono text-blue-800">
                  <Mic className="w-4 h-4 text-rose-500 animate-pulse" />
                  <span>Whisper.cpp Streaming STT: Listening to astronaut voice...</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[12, 22, 30, 16, 26, 14, 28, 34, 18, 20].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-blue-600 rounded-full animate-pulse"
                      style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                    ></span>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSend(inputQuery);
              }}
              className="flex items-center space-x-2 pt-3 border-t border-slate-200"
            >
              <button
                type="button"
                onClick={toggleMic}
                className={`p-3 rounded-2xl border transition-all ${
                  isListening
                    ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-300'
                }`}
                title="Speak to Copilot (Whisper.cpp STT)"
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                type="text"
                placeholder="Ask SUTRA about SOPs, parameters, or contingencies..."
                value={inputQuery}
                onChange={e => setInputQuery(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner"
              />

              <button
                type="submit"
                disabled={!inputQuery.trim() || isGenerating}
                className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white transition-all shadow-md shadow-blue-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
