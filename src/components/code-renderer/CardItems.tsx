
import React from 'react';

interface CardItemsProps {
  parsedUI: any;
}

export const CardItems: React.FC<CardItemsProps> = ({ parsedUI }) => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="h-40 bg-gray-200 dark:bg-gray-700"></div>
          <div className="p-4">
            <div className="text-sm font-medium mb-1">Card Title {item}</div>
            <div className="text-xs text-gray-500 mb-3">
              {parsedUI.features?.[item % parsedUI.features.length] || `This is card ${item} with some description text that explains more about it`}
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xs" style={{ color: parsedUI.primaryColor || '#4F46E5' }}>Learn more</div>
              <div className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                #{item * 100 + 23}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
