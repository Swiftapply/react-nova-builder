
import React from 'react';

interface FloatingActionButtonProps {
  parsedUI: any;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ parsedUI }) => {
  return (
    <div className="absolute bottom-20 right-4">
      <button 
        className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white"
        style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5' }}
      >
        <div className="h-6 w-6" style={{ backgroundColor: 'white', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
      </button>
    </div>
  );
};
