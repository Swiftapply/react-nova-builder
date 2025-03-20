
import React from 'react';

interface TimerAppUIProps {
  parsedUI: any;
}

export const TimerAppUI: React.FC<TimerAppUIProps> = ({ parsedUI }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="text-center mb-6">
        <div className="text-2xl font-bold mb-2">{parsedUI.appName || 'Timer App'}</div>
        <div className="text-sm text-gray-500">{parsedUI.features?.[0] || 'Focus on your tasks'}</div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-xs mb-4">
        <div className="flex items-center justify-center">
          <div className="text-5xl font-bold" style={{ color: parsedUI.primaryColor || '#4F46E5' }}>
            25:00
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button 
            className="px-4 py-2 rounded-full font-medium" 
            style={{ 
              backgroundColor: `${parsedUI.primaryColor || '#4F46E5'}20`,
              color: parsedUI.primaryColor || '#4F46E5'
            }}
          >
            Reset
          </button>
          <button 
            className="px-6 py-2 rounded-full text-white font-medium" 
            style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5' }}
          >
            Start
          </button>
        </div>
      </div>
      
      <div className="w-full max-w-xs">
        <div className="text-sm font-medium mb-2">Sessions</div>
        <div className="space-y-2">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm flex justify-between items-center">
              <div>
                <div className="font-medium">Session {item}</div>
                <div className="text-xs text-gray-500">25 min completed</div>
              </div>
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: parsedUI.accentColor || '#34D399' }}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
