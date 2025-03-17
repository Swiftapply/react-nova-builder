
import React, { useEffect, useRef } from 'react';

interface ChatMessageProps {
  role: 'user' | 'system';
  content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  const messageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    console.log(`ChatMessage rendered: ${role}`);
    return () => {
      console.log(`ChatMessage unmounted: ${role}`);
    };
  }, [role]);

  return (
    <div 
      ref={messageRef}
      className={`p-4 ${role === 'user' ? '' : 'bg-white/5'}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
          {role === 'user' ? (
            <span className="text-xs text-white">U</span>
          ) : (
            <span className="text-xs text-white">W</span> // Changed from "R" to "W" for WingPilot
          )}
        </div>
        <div className="text-xs text-white/60">
          {role === 'user' ? 'You' : 'WingPilot'} {/* Changed from "Rork" to "WingPilot" */}
        </div>
      </div>
      <div className="pl-8 text-sm text-white/80">
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;
