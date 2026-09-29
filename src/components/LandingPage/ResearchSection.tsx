import React, { useState } from 'react';
import { RESEARCH_PAPERS } from '../../data/mockData';
import { ResearchPaper } from '../../types';
import { 
  BookOpen, 
  ExternalLink, 
  FileCheck2, 
  Copy, 
  Check, 
  Search, 
  Sparkles,
  Layers,
  Cpu,
  Eye,
  Database
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

export const ResearchSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Vision & Perception', 'Temporal Modeling', 'Cognitive LLM', 'Edge Systems'];

  const filteredPapers = RESEARCH_PAPERS.filter(paper => {
    const matchesCategory = selectedCategory === 'All' || paper.category === selectedCategory;
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          paper.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          paper.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyCitation = (paper: ResearchPaper) => {
    playSound('beep');
    const citation = `${paper.authors}, "${paper.title}," ${paper.venue}, ${paper.year}.`;
    navigator.clipboard.writeText(citation);
    setCopiedId(paper.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="research" className="py-20 border-b border-slate-800/60 bg-slate-950/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>THEORETICAL FOUNDATIONS & CITATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Research & IEEE Academic References
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            SUTRA synthesizes state-of-the-art literature across spatio-temporal computer vision, causal action segmentation, 
            quantized edge language models, and microgravity space standards.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  playSound('tab');
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search paper or author..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPapers.map(paper => (
            <div
              key={paper.id}
              className="hud-panel p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 font-semibold">
                    {paper.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                    {paper.badge} • {paper.year}
                  </span>
                </div>

                {/* Title & Authors */}
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  {paper.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  {paper.authors}
                </p>
                <p className="text-xs text-blue-400 font-mono mt-0.5">
                  {paper.venue}
                </p>

                {/* SUTRA Synthesis Summary */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-sans">
                  <strong className="text-slate-200 block text-[11px] font-mono uppercase text-blue-300/90 mb-1">
                    Integration in SUTRA:
                  </strong>
                  {paper.summary}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <button
                  onClick={() => handleCopyCitation(paper)}
                  className="inline-flex items-center space-x-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  {copiedId === paper.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Citation Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy BibTeX / Citation</span>
                    </>
                  )}
                </button>

                <a
                  href={paper.doiOrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound('click')}
                  className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 font-semibold group-hover:translate-x-0.5 transition-all"
                >
                  <span>Read Paper</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
