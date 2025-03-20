
import React from 'react';

interface TabBarProps {
  parsedUI: any;
}

export const TabBar: React.FC<TabBarProps> = ({ parsedUI }) => {
  const tabs = [
    { name: 'Home', icon: 'home' },
    { name: 'Search', icon: 'search' },
    { name: 'Create', icon: 'plus-square' },
    { name: 'Activity', icon: 'heart' },
    { name: 'Profile', icon: 'user' }
  ];
  
  return (
    <div className="h-14 border-t border-white/10 flex items-center justify-around bg-black">
      {tabs.map((tab, index) => (
        <button 
          key={index}
          className={`flex flex-col items-center justify-center h-full px-4 ${index === 0 ? 'opacity-100' : 'opacity-50'}`}
        >
          <div className="w-6 h-6 mb-1" style={{ 
            backgroundColor: 'white',
            WebkitMaskImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${getIconPath(tab.icon)}</svg>')`,
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            WebkitMaskSize: 'contain'
          }}></div>
          <span className="text-[10px] text-white">{tab.name}</span>
        </button>
      ))}
    </div>
  );
};

// Helper function to return SVG paths for common icons
const getIconPath = (icon: string): string => {
  switch (icon) {
    case 'home':
      return '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>';
    case 'search':
      return '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>';
    case 'plus-square':
      return '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>';
    case 'heart':
      return '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>';
    case 'user':
      return '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>';
    default:
      return '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>';
  }
};
