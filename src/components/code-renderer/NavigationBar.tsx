
import React from 'react';

interface NavigationBarProps {
  parsedUI: any;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ parsedUI }) => {
  const textColor = parsedUI.hasDarkMode ? 'text-white' : 'text-gray-800';
  
  return (
    <div className="px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        {parsedUI.hasBackButton && (
          <button className="mr-2 text-xs p-1">
            <div className="w-5 h-5 flex items-center justify-center">
              <div className="w-3 h-3" style={{ 
                backgroundColor: parsedUI.primaryColor || 'currentColor',
                WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>\')',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                WebkitMaskSize: 'contain'
              }}></div>
            </div>
          </button>
        )}
        <h1 className={`font-medium ${textColor}`} style={{ fontSize: '15px' }}>
          {parsedUI.appTitle || parsedUI.screenTitle || 'Home'}
        </h1>
      </div>
      
      <div className="flex items-center gap-3">
        {parsedUI.hasMenuButton && (
          <button className="text-xs p-1">
            <div className="w-5 h-5 flex items-center justify-center">
              <div className="w-4 h-4" style={{ 
                backgroundColor: parsedUI.primaryColor || 'currentColor',
                WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>\')',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                WebkitMaskSize: 'contain'
              }}></div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};
