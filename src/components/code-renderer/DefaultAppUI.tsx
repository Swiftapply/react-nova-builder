
import React from 'react';

interface DefaultAppUIProps {
  parsedUI: any;
}

export const DefaultAppUI: React.FC<DefaultAppUIProps> = ({ parsedUI }) => {
  return (
    <div className="flex flex-col p-4">
      <div className="mb-6">
        <div className="text-xl font-bold mb-2">{parsedUI.appName || 'My App'}</div>
        <div className="text-sm text-gray-500 mb-4">Welcome to {parsedUI.appName || 'My App'}</div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-4">
          <div className="text-sm font-medium mb-2">Quick Stats</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
              <div className="text-xs text-gray-500">Total Items</div>
              <div className="text-xl font-bold">24</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
              <div className="text-xs text-gray-500">Completed</div>
              <div className="text-xl font-bold">16</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm font-medium">Recent Activity</div>
          <div className="text-xs" style={{ color: parsedUI.primaryColor || '#4F46E5' }}>See all</div>
        </div>
        
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">Item {item}</div>
                <div className="text-xs text-gray-500">2h ago</div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {parsedUI.features?.[item - 1] || `This is item ${item} description text. It provides details about the item.`}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm font-medium">Featured</div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {[1, 2].map((item) => (
            <div key={item} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2"></div>
              <div className="text-sm font-medium">Feature {item}</div>
              <div className="text-xs text-gray-500 mt-1">Brief description</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
