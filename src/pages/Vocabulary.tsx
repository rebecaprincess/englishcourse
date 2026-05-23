import { useState } from 'react';
import { Volume2, Search, Bookmark, BookmarkCheck } from 'lucide-react';
import { vocabulary, vocabCategories } from '../data/lessons';

export default function Vocabulary() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = vocabulary.filter((v) => {
    const matchCat = activeCategory === 'all' || v.category === activeCategory;
    const matchSearch =
      search === '' ||
      v.en.toLowerCase().includes(search.toLowerCase()) ||
      v.es.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-serif font-semibold text-[#111111]">Vocabulario</h1>
        <p className="text-sm text-[#6E6A63] mt-1">
          {vocabulary.length} términos · {vocabCategories.length} categorías · Contextualizado para Menarini
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar en inglés o español..."
          className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl text-sm border border-[#111111]/5 focus:outline-none focus:ring-2 focus:ring-[#111111]/10"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            activeCategory === 'all' ? 'bg-[#111111] text-white' : 'bg-white text-[#6E6A63] border border-[#111111]/5 hover:bg-gray-50'
          }`}
        >
          Todas
        </button>
        {vocabCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeCategory === cat.id ? 'bg-[#111111] text-white' : 'bg-white text-[#6E6A63] border border-[#111111]/5 hover:bg-gray-50'
            }`}
          >
            {cat.nameEs}
          </button>
        ))}
      </div>

      {/* Vocab Grid */}
      <div className="grid sm:grid-cols-2 gap-2">
        {filtered.map((word) => (
          <div
            key={word.id}
            className="bg-white rounded-xl border border-[#111111]/5 p-4 cursor-pointer hover:shadow-sm transition-all"
            onClick={() => setExpandedId(expandedId === word.id ? null : word.id)}
          >
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(word.en);
                  }}
                  className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center hover:bg-[#A02B8A]/10 transition-colors shrink-0"
                >
                  <Volume2 size={11} className="text-[#A02B8A]" />
                </button>
                <span className="text-[10px] text-[#6E6A63] bg-gray-50 px-1.5 py-0.5 rounded">
                  {vocabCategories.find((c) => c.id === word.category)?.nameEs}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(word.id);
                }}
              >
                {bookmarked.has(word.id) ? (
                  <BookmarkCheck size={14} className="text-[#A02B8A]" />
                ) : (
                  <Bookmark size={14} className="text-gray-300" />
                )}
              </button>
            </div>

            <p className="text-sm font-semibold text-[#111111]">{word.en}</p>
            <p className="text-xs text-[#6E6A63]">{word.es}</p>

            {expandedId === word.id && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <p className="text-[11px] text-[#A02B8A] mb-0.5">Ejemplo:</p>
                <p className="text-xs text-[#111111] leading-relaxed">{word.example}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-10">
          <p className="text-sm text-[#6E6A63]">No se encontraron palabras</p>
        </div>
      )}
    </div>
  );
}
