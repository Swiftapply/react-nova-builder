
import React from 'react';

interface TabBarProps {
  parsedUI: any;
}

export const TabBar: React.FC<TabBarProps> = ({ parsedUI }) => {
  return (
    <div className="flex justify-around items-center py-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex flex-col items-center">
        <div className="h-5 w-5" style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
        <div className="text-xs" style={{ color: parsedUI.primaryColor || '#4F46E5' }}>Home</div>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="h-5 w-5 text-gray-400" style={{ backgroundColor: 'currentColor', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
        <div className="text-xs text-gray-400">Search</div>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="h-5 w-5 text-gray-400" style={{ backgroundColor: 'currentColor', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
        <div className="text-xs text-gray-400">Favorites</div>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="h-5 w-5 text-gray-400" style={{ backgroundColor: 'currentColor', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
        <div className="text-xs text-gray-400">Profile</div>
      </div>
    </div>
  );
};
