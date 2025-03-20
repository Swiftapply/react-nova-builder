
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Github, Settings, Menu, Image, Send } from 'lucide-react';
import SuggestionButton from '@/components/SuggestionButton';

const Index = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestions = [
    {
      text: 'Make a visual novel game',
      icon: <Image className="w-4 h-4" />,
    },
    {
      text: 'Make an Airbnb-style app',
      icon: <Menu className="w-4 h-4" />,
    },
    {
      text: 'Make an Instagram-style app',
      icon: <Image className="w-4 h-4" />,
    },
    {
      text: 'Make a meditation timer',
      icon: <Settings className="w-4 h-4" />,
    },
    {
      text: 'Create a habit tracker',
      icon: <Settings className="w-4 h-4" />,
    },
    {
      text: 'Build a calorie tracker',
      icon: <Settings className="w-4 h-4" />,
    },
    {
      text: 'Create a todo list',
      icon: <Menu className="w-4 h-4" />,
    },
    {
      text: 'Design a weather dashboard',
      icon: <Settings className="w-4 h-4" />,
    },
    {
      text: 'Design a fitness tracker',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setIsLoading(true);
    
    // Navigate to the builder page with the prompt as state
    navigate('/builder', { state: { prompt: inputValue } });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    
    // Short delay to show the input value before navigating
    setTimeout(() => {
      navigate('/builder', { state: { prompt: suggestion } });
    }, 300);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="px-6 py-4 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center">
          <div className="mr-2 rounded bg-primary/20 p-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-bold text-lg">WingPilot</span>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Pricing</a>
          <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Documentation</a>
          <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Blog</a>
          <a href="https://github.com/yourusername/wingpilot" className="ml-2">
            <Github className="w-5 h-5 text-white/60 hover:text-white transition-colors" />
          </a>
        </div>
      </nav>

      {/* Hero section */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4 pt-20 pb-32">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 tracking-tight">
          Build any mobile app, fast.
        </h1>
        <p className="text-xl text-white/70 max-w-3xl mb-12">
          WingPilot builds complete, cross-platform mobile apps using AI and React Native.
        </p>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="w-full max-w-xl mb-8">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe the mobile app you want to build..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white placeholder:text-white/40"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-md ${
                isLoading || !inputValue.trim() ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'
              } transition-colors`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </form>

        {/* Suggestions */}
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
          {suggestions.map((suggestion, index) => (
            <SuggestionButton
              key={index}
              icon={suggestion.icon}
              text={suggestion.text}
              onClick={() => handleSuggestionClick(suggestion.text)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-white/10 text-center">
        <div className="flex justify-center space-x-6 text-sm text-white/60">
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
