
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AppInputProps {
  fullWidth?: boolean;
  placeholder?: string;
  onSubmit?: (text: string) => void;
  showIcons?: boolean;
  autoFocus?: boolean;
}

const AppInput: React.FC<AppInputProps> = ({ 
  fullWidth = false, 
  placeholder = "Describe the mobile app you want to build...",
  onSubmit,
  showIcons = true,
  autoFocus = false
}) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = () => {
    if (text.trim()) {
      if (onSubmit) {
        onSubmit(text);
      } else if (window.location.pathname === '/') {
        navigate('/builder', { state: { prompt: text } });
      }
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    
    // Auto-adjust height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const containerClasses = fullWidth 
    ? "w-full max-w-3xl mx-auto"
    : "w-full max-w-3xl";

  return (
    <div className={containerClasses}>
      <div className="relative glass-morphism rounded-xl overflow-hidden">
        <textarea
          ref={inputRef}
          value={text}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={2}
          className="w-full bg-transparent text-foreground placeholder:text-gray-500 p-4 pr-24 resize-none scrollbar-none outline-none focus:ring-0 input-glow"
          style={{ minHeight: '64px', maxHeight: '150px' }}
        />
        {showIcons && (
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button 
              className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Add image"
            >
              <Image className="w-5 h-5 text-gray-400" />
            </button>
            <button 
              onClick={handleSubmit}
              disabled={!text.trim()}
              className={`p-1.5 rounded-lg bg-white/10 ${text.trim() ? 'hover:bg-white/20' : 'opacity-50 cursor-not-allowed'} transition-colors`}
              aria-label="Send message"
            >
              <SendHorizontal className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppInput;
