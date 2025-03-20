
import React from 'react';

interface ListItemsProps {
  parsedUI: any;
}

export const ListItems: React.FC<ListItemsProps> = ({ parsedUI }) => {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3 flex items-center justify-center">
            {item}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Item {item}</div>
            <div className="text-xs text-gray-500">
              {parsedUI.features?.[item % parsedUI.features.length] || `This is item ${item} description text`}
            </div>
          </div>
          <div className="h-5 w-5" style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15l5-5"></path><path d="M4 4h7a4 4 0 0 1 4 4v12"></path><path d="M20 4v12a4 4 0 0 1-4 4H4"></path></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
        </div>
      ))}
    </div>
  );
};
