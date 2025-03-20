
import React from 'react';

interface ListItemsProps {
  parsedUI: any;
}

export const ListItems: React.FC<ListItemsProps> = ({ parsedUI }) => {
  const demoItems = [
    { id: '1', title: 'Item 1', subtitle: 'Description for item 1' },
    { id: '2', title: 'Item 2', subtitle: 'Description for item 2' },
    { id: '3', title: 'Item 3', subtitle: 'Description for item 3' },
  ];
  
  return (
    <div className="px-4 py-2">
      {demoItems.map((item) => (
        <div 
          key={item.id}
          className="flex items-center py-2 px-3 mb-2 rounded-lg bg-white/5 border border-white/10"
        >
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-500/50 to-purple-500/50 mr-3 flex items-center justify-center">
            <div className="w-5 h-5" style={{ 
              backgroundColor: 'white',
              WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>\')',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              WebkitMaskSize: 'contain'
            }}></div>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-white">{item.title}</div>
            <div className="text-xs text-white/60">{item.subtitle}</div>
          </div>
          <div className="w-5 h-5" style={{ 
            backgroundColor: 'white',
            WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>\')',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            WebkitMaskSize: 'contain',
            opacity: 0.5
          }}></div>
        </div>
      ))}
    </div>
  );
};
