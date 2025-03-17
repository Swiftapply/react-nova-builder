
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SuggestionButtonProps {
  text: string;
  onClick: () => void;
}

const SuggestionButton: React.FC<SuggestionButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 text-sm text-white/90"
    >
      {text}
      <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
    </button>
  );
};

export default SuggestionButton;
