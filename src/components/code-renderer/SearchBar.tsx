
import React from 'react';

interface SearchBarProps {
  parsedUI: any;
}

export const SearchBar: React.FC<SearchBarProps> = ({ parsedUI }) => {
  return (
    <div className="mb-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <div className="h-4 w-4 text-gray-400" style={{ backgroundColor: 'currentColor', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
        </div>
        <input
          type="text"
          className="bg-gray-100 dark:bg-gray-800 text-sm rounded-full w-full pl-10 pr-4 py-2 focus:outline-none"
          placeholder="Search..."
          style={{ borderColor: `${parsedUI.primaryColor || '#4F46E5'}20` }}
        />
      </div>
    </div>
  );
};
