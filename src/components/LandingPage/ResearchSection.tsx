import React, { useState } from 'react';
import { RESEARCH_PAPERS } from '../../data/mockData';
import { ResearchPaper } from '../../types';
import { 
  BookOpen, 
  ExternalLink, 
  Copy, 
  Check, 
  Search
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
    <section id="research" className="py-20 px-6 sm:px-12 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>THEORETICAL FOUNDATIONS & CITATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Research & Academic References
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
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
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search paper or author..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 shadow-sm"
            />
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPapers.map(paper => (
            <div
              key={paper.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                    {paper.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {paper.badge} • {paper.year}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {paper.title}
                </h3>
                <p className="text-xs font-mono text-slate-500 mt-1">
                  {paper.authors}
                </p>
                <p className="text-xs text-blue-700 font-mono mt-0.5 font-semibold">
                  {paper.venue}
                </p>

                <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800 block text-[11px] font-mono uppercase text-blue-700 mb-1">
                    Integration in SUTRA:
                  </strong>
                  {paper.summary}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                <button
                  onClick={() => handleCopyCitation(paper)}
                  className="inline-flex items-center space-x-1.5 text-slate-500 hover:text-slate-900 transition-colors"
                >
                  {copiedId === paper.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy BibTeX / Citation</span>
                    </>
                  )}
                </button>

                <a
                  href={paper.doiOrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound('click')}
                  className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-semibold"
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
