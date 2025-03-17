
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { File, Code, Settings, Share, RotateCcw, MessageSquare, Play } from 'lucide-react';
import AppInput from './AppInput';
import { useAIService } from '@/services/AIService';
import ChatMessage from './ChatMessage';
import ModelSelector from '@/components/ModelSelector';

interface SidebarProps {
  messages?: {
    role: 'user' | 'system';
    content: string;
  }[];
  isLoading?: boolean;
  onMessageSent?: (message: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ messages = [], isLoading = false, onMessageSent }) => {
  const navigate = useNavigate();
  const { updateAppProgress } = useAIService();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef<number>(0);
  
  // Log messages for debugging
  useEffect(() => {
    console.log('Messages updated:', messages);
    console.log('Previous message count:', prevMessagesLengthRef.current);
    console.log('Current message count:', messages.length);
    
    // Scroll to bottom when new messages are added
    if (messages.length > prevMessagesLengthRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    
    prevMessagesLengthRef.current = messages.length;
  }, [messages]);
  
  const handleSubmit = (text: string) => {
    console.log('Submitting message:', text);
    if (onMessageSent) {
      onMessageSent(text);
    }
  };
  
  const handleUpdateProgress = async () => {
    console.log('Updating app progress');
    await updateAppProgress();
  };

  return (
    <div className="flex flex-col h-full w-full bg-sidebar border-r border-white/5">
      <div className="flex-1 overflow-y-auto scrollbar-none">
        {messages.length === 0 ? (
          <div className="p-4 text-white/50 text-sm italic">
            No messages yet. Start by describing your app.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {messages.map((message, index) => (
              <div key={`message-${index}`} className="message-container">
                <ChatMessage role={message.role} content={message.content} />
                {message.role === 'system' && (
                  <div className="pl-8 mt-2 flex gap-2">
                    <button 
                      className="text-xs text-white/60 hover:text-white transition-colors"
                      title="Regenerate response"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      className="text-xs text-white/60 hover:text-white transition-colors"
                      title="View code"
                    >
                      <Code className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={handleUpdateProgress}
                      className="text-xs text-white/60 hover:text-white transition-colors"
                      title="Continue generation"
                    >
                      <Play className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="p-4 bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <MessageSquare className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white">WingPilot</span>
                </div>
                <div className="text-sm text-white">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75"></span>
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150"></span>
                    <span className="ml-2">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/5">
        <div className="flex flex-col space-y-3">
          <ModelSelector className="self-end" />
          <AppInput 
            onSubmit={handleSubmit}
            placeholder="Ask a question about your app..."
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
