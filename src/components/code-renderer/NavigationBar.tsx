
import React from 'react';

interface NavigationBarProps {
  parsedUI: any;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ parsedUI }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="text-lg font-bold">{parsedUI.appName || 'App Name'}</div>
      <div className="flex items-center space-x-3">
        <div className="h-5 w-5" style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 2v4"></path><path d="M8 2v4"></path><path d="M3 10h18"></path><path d="M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"></path></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
        <div className="h-5 w-5" style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
      </div>
    </div>
  );
};
