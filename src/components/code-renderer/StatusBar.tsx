
import React from 'react';

interface StatusBarProps {
  platform: 'ios' | 'android';
}

export const StatusBar: React.FC<StatusBarProps> = ({ platform }) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  if (platform === 'ios') {
    return (
      <div className="h-6 bg-transparent px-5 flex items-center justify-between text-white text-xs">
        <div>{currentTime}</div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full border border-current flex items-center justify-center">
            <div className="h-1 w-[3px] bg-current"></div>
          </div>
          <div className="h-3 w-3">
            <div className="h-[2px] w-full bg-current mb-[2px]"></div>
            <div className="h-[2px] w-full bg-current mb-[2px]"></div>
            <div className="h-[2px] w-full bg-current"></div>
          </div>
          <div className="w-10 h-[10px] rounded-sm border border-current relative overflow-hidden">
            <div className="absolute inset-[1px] left-[1px] right-[30%] bg-current rounded-xs"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Android status bar
  return (
    <div className="h-6 bg-transparent px-5 flex items-center justify-between text-white text-xs">
      <div>{currentTime}</div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 relative">
          <div className="w-2 h-2 border-t border-r border-current absolute top-0 right-0 rounded-tr-sm"></div>
          <div className="w-2 h-2 border-b border-l border-current absolute bottom-0 left-0 rounded-bl-sm"></div>
        </div>
        <div className="w-3 h-3 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="h-[2px] w-full bg-current"></div>
          </div>
          <div className="absolute inset-0 flex justify-center">
            <div className="w-[2px] h-full bg-current"></div>
          </div>
        </div>
        <div className="w-10 h-[10px] rounded-sm border border-current relative overflow-hidden">
          <div className="absolute inset-[1px] left-[1px] right-[30%] bg-current rounded-xs"></div>
        </div>
      </div>
    </div>
  );
};
