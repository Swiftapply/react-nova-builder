
import React from 'react';

interface SearchBarProps {
  parsedUI: any;
}

export const SearchBar: React.FC<SearchBarProps> = ({ parsedUI }) => {
  return (
    <div className="px-4 py-1">
      <div className="bg-white/10 rounded-full px-3 py-1.5 flex items-center gap-2">
        <div className="w-4 h-4" style={{ 
          backgroundColor: parsedUI.secondaryTextColor || 'gray',
          WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>\')',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          WebkitMaskSize: 'contain'
        }}></div>
        <div className="text-xs text-white/60">Search</div>
      </div>
    </div>
  );
};
