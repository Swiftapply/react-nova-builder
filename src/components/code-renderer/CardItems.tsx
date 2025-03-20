
import React from 'react';

interface CardItemsProps {
  parsedUI: any;
}

export const CardItems: React.FC<CardItemsProps> = ({ parsedUI }) => {
  const textColor = parsedUI.hasDarkMode ? 'text-white' : 'text-gray-800';
  
  return (
    <div className="px-4 py-2">
      <div className="bg-white/10 rounded-xl overflow-hidden border border-white/20 mb-3">
        <div className="aspect-video bg-gradient-to-r from-blue-400/30 to-purple-500/30 flex items-center justify-center">
          <div className="w-12 h-12" style={{ 
            backgroundColor: 'white',
            WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>\')',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            WebkitMaskSize: 'contain',
            opacity: 0.7
          }}></div>
        </div>
        <div className="p-3">
          <h3 className={`font-medium text-sm ${textColor}`}>Card Title</h3>
          <p className="text-xs text-white/60 mt-1">This is a sample card description that would display information about this card item.</p>
        </div>
      </div>
      
      <div className="bg-white/10 rounded-xl overflow-hidden border border-white/20">
        <div className="aspect-video bg-gradient-to-r from-emerald-400/30 to-blue-500/30 flex items-center justify-center">
          <div className="w-12 h-12" style={{ 
            backgroundColor: 'white',
            WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>\')',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            WebkitMaskSize: 'contain',
            opacity: 0.7
          }}></div>
        </div>
        <div className="p-3">
          <h3 className={`font-medium text-sm ${textColor}`}>Another Card</h3>
          <p className="text-xs text-white/60 mt-1">This is a sample card description that would display information about this card item.</p>
        </div>
      </div>
    </div>
  );
};
